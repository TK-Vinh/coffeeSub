import { RedemptionService } from './RedemptionService';

/**
 * Proxy adding an abstraction layer over RedemptionService, allowing
 * logging or authentication headers in real implementations.
 */
export class RedemptionProxy {
  constructor(private service: RedemptionService = new RedemptionService()) {}

  async redeem(code: string): Promise<boolean> {
    console.log('RedemptionProxy: redeem called');
    return this.service.redeem(code);
  }
}
