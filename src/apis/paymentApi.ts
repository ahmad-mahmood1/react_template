import { api } from 'src/apis/api.ts';
import { endpoints } from 'src/apis/endpoints.ts';
import { Checkout } from 'src/interfaces/cart.ts';
import { CheckoutUrl } from 'src/interfaces/interfaces.ts';
import { Invoice, Refund, RequestRefund } from 'src/interfaces/invoice.ts';
import { PaymentMethod, PaymentProcessor } from 'src/interfaces/payment.ts';

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    productsCheckout: builder.mutation<CheckoutUrl, Checkout>({
      query: (checkoutData) => ({
        url: endpoints.CHECKOUT,
        method: 'POST',
        body: checkoutData,
      }),
    }),
    invoice: builder.query<Invoice, number>({
      query: (id) => ({
        url: endpoints.INVOICE(id),
        method: 'GET',
      }),
      providesTags: ['invoices'],
    }),
    invoices: builder.query<Invoice[], void>({
      query: () => ({
        url: endpoints.INVOICES,
        method: 'GET',
      }),
      providesTags: ['invoices'],
    }),
    refund: builder.mutation<void, RequestRefund>({
      query: (refundData) => ({
        url: endpoints.REFUNDS,
        method: 'POST',
        body: refundData,
      }),
      invalidatesTags: ['invoices'],
    }),
    refunds: builder.query<Refund[], void>({
      query: () => ({
        url: endpoints.REFUNDS,
        method: 'GET',
      }),
    }),
    paymentMethods: builder.query<PaymentMethod[], void>({
      query: () => ({
        url: endpoints.PAYMENT_METHODS,
        method: 'GET',
      }),
      providesTags: ['PaymentMethods'],
    }),
    updatePaymentMethod: builder.mutation<void, { id: number } & PaymentProcessor>({
      query: ({ id, ...paymentProcessor }) => ({
        url: endpoints.PAYMENT_METHOD(id),
        method: 'PATCH',
        body: paymentProcessor,
      }),
      invalidatesTags: ['PaymentMethods'],
    }),
    deactivatePaymentMethod: builder.mutation<void, { id: number } & PaymentProcessor>({
      query: ({ id, ...paymentProcessor }) => ({
        url: endpoints.PAYMENT_METHOD(id),
        method: 'DELETE',
        body: paymentProcessor,
      }),
      invalidatesTags: ['PaymentMethods'],
    }),
  }),
});

export const {
  useProductsCheckoutMutation,
  useInvoiceQuery,
  useInvoicesQuery,
  useRefundMutation,
  useRefundsQuery,
  usePaymentMethodsQuery,
  useUpdatePaymentMethodMutation,
  useDeactivatePaymentMethodMutation,
} = paymentApi;
