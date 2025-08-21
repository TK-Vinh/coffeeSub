import { AuthFacade } from '@/facades/AuthFacade';
import { SubscriptionFacade } from '@/facades/SubscriptionFacade';

export interface AppFactory {
  createAuthFacade(): AuthFacade;
  createSubscriptionFacade(): SubscriptionFacade;
}

export class UserAppFactory implements AppFactory {
  createAuthFacade(): AuthFacade {
    return new AuthFacade();
  }
  createSubscriptionFacade(): SubscriptionFacade {
    return new SubscriptionFacade();
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
}
