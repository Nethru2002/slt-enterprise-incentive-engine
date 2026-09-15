import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('AuditLogger');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(`[AUDIT] ${method} ${originalUrl} ${statusCode} - IP: ${ip} - UA: ${userAgent}`);
    });

    next();
  }
}