import { ErrorHandler, Injectable, inject } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private logger = inject(LoggingService);
  handleError(error: any): void {
    try {
      this.logger.error('GlobalError', 'Unhandled error:', error);
    } catch(e) {
      // last resort
      console.error('GlobalError fallback', error);
    }
  }
}
