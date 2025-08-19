import { RedemptionProxy } from '@/services/redemption/RedemptionProxy';

/**
 * Facade exposing a simple redeem method for the UI layer.
 */
export class RedemptionFacade {
  constructor(private proxy: RedemptionProxy = new RedemptionProxy()) {}

  redeem(code: string): Promise<boolean> {
    return this.proxy.redeem(code);
  }
}
