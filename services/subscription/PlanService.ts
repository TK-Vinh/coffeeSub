import { Plan } from '@/factories/PlanFactory';

/**
 * Service that would normally fetch plans from API and manage purchases.
 */
export class PlanService {
  async fetchPlans(): Promise<Plan[]> {
    // mock plan list
    return [
      { id: 'basic', name: 'Basic Plan', price: 10, totalCups: 10 },
      { id: 'premium', name: 'Premium Plan', price: 20, totalCups: 25 },
    ];
  }

  async purchasePlan(planId: string, userId: string): Promise<void> {
    console.log(`Purchasing plan ${planId} for user ${userId}`);
    return;
  }
}
