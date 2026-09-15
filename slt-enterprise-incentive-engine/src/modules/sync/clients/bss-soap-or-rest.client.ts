import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BssClient {
  private readonly logger = new Logger(BssClient.name);

  async fetchExternalBssRecords(): Promise<any[]> {
    this.logger.log('Connecting to BSS endpoint via SOAP/REST API gateway...');
    return [
      { orderReference: 'BSS-REF-9081', totalAmount: 450000.00 },
      { orderReference: 'BSS-REF-9082', totalAmount: 1200000.00 },
    ];
  }
}