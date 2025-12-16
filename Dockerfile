FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y \
    libffi-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy project files
COPY requirements.txt .
COPY alembic.ini .
COPY main.py .
COPY alembic ./alembic
COPY api ./api
COPY config_and_macros ./config_and_macros

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy and build frontend
COPY web/package.json web/package-lock.json ./web/
WORKDIR /app/web

# Install dependencies with optimizations for low-memory systems
RUN npm ci --prefer-offline --no-audit --progress=false

COPY web ./

# Create temporary .env for build (will be replaced during installation)
RUN echo "API_URL=http://localhost:5000/api" > /app/.env && \
    echo "WS_URL=ws://localhost:5000/api" >> /app/.env && \
    echo "LOG_LEVEL=INFO" >> /app/.env && \
    echo "DRYER_LOG_LEVEL=INFO" >> /app/.env && \
    echo "CLEAR_LOGS_ON_STARTUP=True" >> /app/.env && \
    echo "HOST=0.0.0.0" >> /app/.env && \
    echo "PORT=5000" >> /app/.env

# Ensure local ng is executable and run the build via the local binary
RUN if [ -f ./node_modules/.bin/ng ]; then chmod +x ./node_modules/.bin/ng || true; fi && \
    ./node_modules/.bin/ng build --configuration production

# Remove temporary .env (will be mounted from host during runtime)
RUN rm /app/.env

# Back to app directory
WORKDIR /app

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose port
EXPOSE 5000

# Set entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]