import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: string, context?: string) {
    console.log(`[INFO] [${context || 'System'}]: ${message}`);
  }
  error(message: string, trace?: string, context?: string) {
    console.error(`[ERROR] [${context || 'System'}]: ${message} -> Trace: ${trace}`);
  }
  warn(message: string, context?: string) {
    console.warn(`[WARN] [${context || 'System'}]: ${message}`);
  }
  debug(message: string, context?: string) {
    console.debug(`[DEBUG] [${context || 'System'}]: ${message}`);
  }
  verbose(message: string, context?: string) {
    console.log(`[VERBOSE] [${context || 'System'}]: ${message}`);
  }
}