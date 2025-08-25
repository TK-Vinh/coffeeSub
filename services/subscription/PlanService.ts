import { Plan } from '@/factories/PlanFactory';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class PlanService {
  async fetchPlans(): Promise<Plan[]> {
    if (!API_URL) {
      throw new Error('Missing API URL');
    }

    const res = await fetch(`${API_URL}/SubscriptionPlan`);
    if (!res.ok) {
      throw new Error('Failed to fetch subscription plans');
    }

    const json = await res.json();
    return json.data ?? json;
  }

  async fetchPlan(id: number): Promise<Plan> {
    if (!API_URL) {
      throw new Error('Missing API URL');
    }

    const res = await fetch(`${API_URL}/SubscriptionPlan/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch subscription plan');
    }

    const json = await res.json();
    return json.data ?? json;
  }

  async createPaymentUrl(planId: number, userId: number): Promise<string> {
    if (!API_URL) {
      throw new Error('Missing API URL');
    }

    const res = await fetch(
      `${API_URL}/Vnpay/CreatePaymentUrl?planId=${planId}&userId=${userId}`,
    );
    if (!res.ok) {
      throw new Error('Failed to create payment url');
    }

    // API returns the payment URL as plain text
    const url = await res.text();
    return url;
  }
}
