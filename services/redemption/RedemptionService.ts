/**
 * Service handling coffee ticket redemption. Would typically reach out to
 * backend to validate QR codes and update tracking information.
 */
export class RedemptionService {
  async redeem(code: string): Promise<boolean> {
    console.log(`Redeeming code: ${code}`);
    return true; // mock success
  }
}
