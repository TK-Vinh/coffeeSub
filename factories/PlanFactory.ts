export interface Plan {
  id: string;
  name: string;
  price: number;
  totalCups: number;
}

class BasicPlan implements Plan {
  id = 'basic';
  name = 'Basic Plan';
  price = 10;
  totalCups = 10;
}

class PremiumPlan implements Plan {
  id = 'premium';
  name = 'Premium Plan';
  price = 20;
  totalCups = 25;
}

/**
 * Factory responsible for creating plan objects based on type.
 */
export class PlanFactory {
  static create(type: 'basic' | 'premium'): Plan {
    switch (type) {
      case 'premium':
        return new PremiumPlan();
      default:
        return new BasicPlan();
    }
  }
}
