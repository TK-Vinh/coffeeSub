import { PlanFactory, Plan } from '@/factories/PlanFactory';
import { PlanService } from '@/services/subscription/PlanService';

/**
 * Facade for subscription related flows such as listing plans and purchasing.
 */
export class SubscriptionFacade {
  constructor(private service: PlanService = new PlanService()) {}

  async getPlans(): Promise<Plan[]> {
    return this.service.fetchPlans();
  }

  async purchase(planType: 'basic' | 'premium', userId: string): Promise<void> {
    const plan: Plan = PlanFactory.create(planType);
    await this.service.purchasePlan(plan.id, userId);
  }
}
