import logging
from logging.handlers import RotatingFileHandler
import json


config = json.load(open('./config.json'))

logger = logging.getLogger("app")
logger.setLevel(config['app_log_level'])  


access_logger = logging.getLogger('aiohttp.access')
access_logger.setLevel(config['web_log_level'])

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')


file_handler = RotatingFileHandler('app.log', maxBytes=10*1024*1024, backupCount=5, encoding='utf-8')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)


console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

access_file_handler = RotatingFileHandler('aiohttp_access.log', maxBytes=10*1024*1024, backupCount=5, encoding='utf-8')
access_file_handler.setFormatter(formatter)
access_logger.addHandler(access_file_handler)

access_console_handler = logging.StreamHandler()
access_console_handler.setFormatter(formatter)
access_logger.addHandler(access_console_handler)