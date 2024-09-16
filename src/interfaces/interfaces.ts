export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

export interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;
}

export interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (firstName: string, lastName: string) => void;
  initialFirstName: string;
  initialLastName: string;
}

export interface TermCondition {
  name: string;
  details: string;
}

export interface CheckoutUrl {
  checkout_page_url: string;
}

export interface Settings {
  id: number;
  name: string;
  value: string;
  source: string;
}
