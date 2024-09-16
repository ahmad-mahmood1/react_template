export const GLOBALS = {
  TOAST_TIMER: 3000,
  MIN_PASSWORD_LENGTH: 8,
};

export const LABELS = {
  APP: 'White Label',
  LOGIN: 'Log In',
  SIGNUP: 'Sign Up',
  LOGOUT: 'Logout',
  SETTINGS: 'Settings',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  FORGOT_PASSWORD: 'Forgot Password',
  RESET_PASSWORD: 'Reset Password',
  FIND_ACCOUNT: 'Find Account',
  CONFIRM_PASSWORD: 'Confirm Password',
  PROFILE: 'Profile',
  UPDATE_PROFILE: 'Update Profile',
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  SAVE: 'Save',
  UPDATE: 'Update',
  ACTIVATE_USER: 'Activate User',
  VERIFY: 'Verify',
  RESEND_ACTIVATION_EMAIL: 'Resend Activation Email',
  TERMS_AND_CONDITIONS: 'Terms and Conditions',
  OK: 'Ok',
  CANCEL: 'Cancel',
  ACCEPT: 'Accept',
  PRODUCTS: 'Products',
  PACKAGES: 'Packages',
  CART: 'Cart',
  CHECKOUT: 'Checkout',
  PAYMENT_SUCCESSFUL: 'Payment Successful',
  PAYMENT_FAILED: 'Payment Failed',
  PAYMENT_METHODS: 'Payment Methods',
  INVOICES: 'Invoices',
  SUBSCRIBE: 'Subscribe',
  ORDERS: 'Orders',
  SUBSCRIPTIONS: 'Subscriptions',
  DEACTIVATE: 'Deactivate',
  REFUND: 'Refund',
  REFUNDS: 'Refunds',
  REFUNDED: 'Refunded',
  MODULES: 'Modules',
};

export const CLAUSES = {
  REMEMBER_ME: 'Remember me',
  LOGIN_NOW: 'Head over to Login',
  VIEW_PROFILE: 'Head over to Profile',
  FORGOT_PASSWORD: 'Forgot password?',
  SIGN_UP_CLAUSE: "Don't have an account? Sign Up",
  LOG_IN_CLAUSE: 'Already have an account? Log in',
  VALID_EMAIL: 'Please enter a valid email address.',
  EMAIL_REQUIRED: 'Email is required.',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_LENGTH: `Password must be at least ${GLOBALS.MIN_PASSWORD_LENGTH} characters.`,
  PASSWORD_COMPLEXITY: 'Password must contain at least one letter and one number.',
  CONFIRM_PASSWORD_MATCH: 'Passwords do not match.',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm Password is required.',
  PASSWORD_RESET_LINK: 'Password reset link has been successfully sent to your email.',
  PASSWORD_RESET_SUCCESSFUL: 'Password has been reset successfully.',
  ACTIVATION_SUCCESSFUL: 'Activation Successful',
  EMAIL_SENT: 'Email sent successfully.',
  RESEND_ACTIVATION_EMAIL:
    "To gain access to all pages, please verify your email address. An activation email was sent upon signup. If you haven't received it, kindly use the button below to resend the activation email.",
  CART_EMPTY: 'There are no items in the cart.',
  VIEW_PRODUCTS: 'Back to Products',
  VIEW_PACKAGES: 'Back to Packages',
  VIEW_INVOICES: 'Back to Invoices',
  WILL_HAVE_ACCESS_TO: 'You will get access to',
  HAVE_ACCESS_TO: 'You have access to',
  REFUND_SUCCESSFUL: 'Refund processed successfully.',
  VALID_UNTIL: 'Valid until',
  SUBSCRIPTION_DEACTIVATED: 'Subscription deactivated successfully.',
  PAYMENT_METHOD_UPDATED: 'Payment method updated successfully.',
  THEME_UPDATED: 'Theme updated successfully.',
  SHOP_CLOSED: 'Products are not available at this time',
  NO_INVOICES: 'No invoices found.',
  NO_SUBSCRIPTIONS: 'No subscriptions found.',
  NO_PRODUCTS: 'No products found.',
  NO_PACKAGES: 'No packages found.',
  NO_PAYMENT_METHODS: 'No payment methods found.',
  NO_REFUNDS: 'No refunds found.',
};

export const TOKEN_KEYS = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  USER: 'user',
};

export const PAYMENTS = {
  PAYMENT: 'payment',
  STRIPE: 'stripe',
  SUBSCRIPTION: 'subscription',
};

export const STATUS = {
  SUCCEEDED: 'Succeeded',
};

export const SETTING_NAMES = {
  THEME: 'theme',
  UNAVAILABLE_PACKAGES: 'unavailablePackages',
  SHOP_TIMINGS: 'shopTimings',
};
