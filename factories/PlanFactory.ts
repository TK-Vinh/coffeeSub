export interface Plan {
  planId: number;
  planName: string;
  description: string;
  price: number;
  durationDays: number;
  totalCups: number;
  dailyCupLimit: number;
  isActive: boolean;
}
