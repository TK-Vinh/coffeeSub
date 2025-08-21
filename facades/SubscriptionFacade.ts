import { Plan } from '@/factories/PlanFactory';
import { PlanService } from '@/services/subscription/PlanService';

/** Facade for subscription-related flows such as listing plans. */
export class SubscriptionFacade {
  constructor(private service: PlanService = new PlanService()) {}

  async getPlans(): Promise<Plan[]> {
    return this.service.fetchPlans();
  }
}
