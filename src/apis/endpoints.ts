const V1 = `/api/v1`;
const USERS = `${V1}/users`;
const PAYMENTS = `${V1}/payments`;

export const endpoints = {
  LOGIN: `${USERS}/login/`,
  SIGNUP: `${USERS}/`,
  LOGIN_WITH_GOOGLE: `${USERS}/accounts/google/`,
  REFRESH_TOKEN: (id: number) => `${USERS}/${id}/refresh-token`,
  USER: (id: number) => `${USERS}/${id}/`,
  SETTINGS: `${USERS}/settings`,
  SETTING: (id: number) => `${USERS}/settings/${id}/`,
  REQUEST_PASSWORD_RESET: `${USERS}/reset-password`,
  RESET_PASSWORD: (uid: string, token: string) =>
    `${USERS}/reset-password/confirm/${uid}/${token}/`,
  ACTIVATE_USER: (uid: string, token: string) => `${USERS}/activate/${uid}/${token}/`,
  RESEND_ACTIVATION_EMAIL: (id: number) => `${USERS}/${id}/resend-activation-email`,
  AGREEMENTS: `${V1}/agreements/`,
  PRODUCTS: `${PAYMENTS}/products`,
  PRODUCT: (id: number) => `${PAYMENTS}/products/${id}`,
  PACKAGES: `${PAYMENTS}/packages`,
  PACKAGE: (id: number) => `${PAYMENTS}/packages/${id}`,
  SUBSCRIPTIONS: `${PAYMENTS}/subscriptions/`,
  CHECKOUT: `${PAYMENTS}/checkout`,
  INVOICES: `${PAYMENTS}/invoices/`,
  INVOICE: (id: number) => `${PAYMENTS}/invoices/${id}`,
  REFUNDS: `${PAYMENTS}/refunds`,
  PAYMENT_METHODS: `${PAYMENTS}/payment-methods`,
  PAYMENT_METHOD: (id: number) => `${PAYMENTS}/payment-methods/${id}/`,
  MODULES: `${PAYMENTS}/modules`,
  USER_MODULES: `${PAYMENTS}/user-modules`,
};
