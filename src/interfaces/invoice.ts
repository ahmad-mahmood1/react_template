export interface LineItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Invoice {
  id: number;
  mode: string;
  status: string;
  is_refundable: boolean;
  line_items: LineItem[];
  object_id: string;
  payment_processor: string;
  payment_id: string;
  amount: number;
  created_at: string;
}

export interface RequestRefund {
  invoice_id: number;
  processor_name: string;
}

export interface Refund {
  id: number;
  status: string;
  invoice: Invoice;
  created_at: string;
  amount: number;
}
