import { AuthFacade } from '@/facades/AuthFacade';
import { SubscriptionFacade } from '@/facades/SubscriptionFacade';
import { RedemptionFacade } from '@/facades/RedemptionFacade';

export interface AppFactory {
  createAuthFacade(): AuthFacade;
  createSubscriptionFacade(): SubscriptionFacade;
  createRedemptionFacade(): RedemptionFacade;
}

export class UserAppFactory implements AppFactory {
  createAuthFacade(): AuthFacade {
    return new AuthFacade();
  }
  createSubscriptionFacade(): SubscriptionFacade {
    return new SubscriptionFacade();
  }
  createRedemptionFacade(): RedemptionFacade {
    return new RedemptionFacade();
  }
}

export class StaffAppFactory implements AppFactory {
  createAuthFacade(): AuthFacade {
    return new AuthFacade();
  }
  createSubscriptionFacade(): SubscriptionFacade {
    // Staff app might not use subscriptions
    return new SubscriptionFacade();
  }
  createRedemptionFacade(): RedemptionFacade {
    return new RedemptionFacade();
  }
}
