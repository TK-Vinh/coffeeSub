import { Plan } from '@/factories/PlanFactory';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class PlanService {
  async fetchPlans(): Promise<Plan[]> {
    if (!API_URL) {
      throw new Error('Missing API URL');
    }

    const res = await fetch(`${API_URL}/SubscriptionPlan/getAll`);
    if (!res.ok) {
      throw new Error('Failed to fetch subscription plans');
    }

    const json = await res.json();
    return json.data ?? json;
  }
}
