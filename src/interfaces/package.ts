export interface Module {
  id: number;
  name: string;
  description: string;
}

export interface Package {
  id: number;
  modules: Module[];
  name: string;
  description: string;
  price: number;
  is_active: boolean;
  stripe_price_id: string;
  features: string;
}

export interface Subscribe {
  package_id: number;
  mode: string;
  processor_name: string;
}

export interface DeactivateSubscription {
  subscription_id: number;
}

export interface Subscription {
  id: number;
  package: Package;
  current_period_end: string;
  subscription_id: string;
  created_at: string;
  is_active: boolean;
  user: number;
}

export interface Module {
  id: number;
  name: string;
  description: string;
}
