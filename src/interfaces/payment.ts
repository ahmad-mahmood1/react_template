export interface PaymentMethod {
  id: number;
  type: string;
  payment_processor: string;
  payment_method_id: string;
  card_brand: string;
  card_last_4_digits: number;
  is_default: boolean;
  is_active: boolean;
  user: number;
}

export interface PaymentProcessor {
  processor_name: string;
}
