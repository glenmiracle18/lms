// (You might want to adjust these if needed, based on your actual usage)
export type NewPlan = {
  id: number;
  productId?: number;
  productName?: string;
  variantId?: number;
  name: string;
  description?: string;
  price: string;
  isUsageBased?: boolean;
  interval?: string;
  intervalCount?: number;
  trialInterval?: string;
  trialIntervalCount?: number;
  sort?: number;
};

export type NewWebhookEvent = {
  id: number;
  createdAt?: Date;
  eventName: string;
  processed?: boolean;
  body: Record<string, any>;
  processingError?: string;
};

export type NewSubscription = {
  id: number;
  lemonSqueezyId?: string;
  orderId?: number;
  name: string;
  email: string;
  status: string;
  statusFormatted: string;
  renewsAt?: string;
  endsAt?: string;
  trialEndsAt?: string;
  price: string;
  isUsageBased?: boolean;
  isPaused?: boolean;
  userId?: string;
  planId?: number;
};
