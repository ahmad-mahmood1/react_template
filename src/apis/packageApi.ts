import { api } from 'src/apis/api.ts';
import { endpoints } from 'src/apis/endpoints.ts';
import { CheckoutUrl } from 'src/interfaces/interfaces.ts';
import {
  DeactivateSubscription,
  Module,
  Package,
  Subscribe,
  Subscription,
} from 'src/interfaces/package.ts';

export const packageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    package: builder.query<Package, number>({
      query: (id) => ({
        url: endpoints.PACKAGE(id),
        method: 'GET',
      }),
    }),
    packages: builder.query<Package[], void>({
      query: () => ({
        url: endpoints.PACKAGES,
        method: 'GET',
      }),
    }),
    subscribe: builder.mutation<CheckoutUrl, Subscribe>({
      query: (subscriptionData) => ({
        url: endpoints.CHECKOUT,
        method: 'POST',
        body: subscriptionData,
      }),
    }),
    deactivateSubscription: builder.mutation<void, DeactivateSubscription>({
      query: (deactivationData) => ({
        url: endpoints.SUBSCRIPTIONS,
        method: 'POST',
        body: deactivationData,
      }),
      invalidatesTags: ['invoices'],
    }),
    subscriptions: builder.query<Subscription[], void>({
      query: () => ({
        url: endpoints.SUBSCRIPTIONS,
        method: 'GET',
      }),
    }),
    modules: builder.query<Module[], void>({
      query: () => ({
        url: endpoints.MODULES,
        method: 'GET',
      }),
    }),
    userModules: builder.query<Module[], void>({
      query: () => ({
        url: endpoints.USER_MODULES,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  usePackageQuery,
  usePackagesQuery,
  useSubscribeMutation,
  useSubscriptionsQuery,
  useDeactivateSubscriptionMutation,
  useModulesQuery,
  useUserModulesQuery,
} = packageApi;
