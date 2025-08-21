import { Plan } from '@/factories/PlanFactory';
import { PlanService } from '@/services/subscription/PlanService';

/** Facade for subscription-related flows such as listing plans. */
export class SubscriptionFacade {
  constructor(private service: PlanService = new PlanService()) {}

  async getPlans(): Promise<Plan[]> {
    return this.service.fetchPlans();
  }

  async getPlan(id: number): Promise<Plan> {
    return this.service.fetchPlan(id);
  }

  async createPaymentUrl(planId: number, userId: number): Promise<string> {
    return this.service.createPaymentUrl(planId, userId);
  }
}
