import { api } from 'src/apis/api.ts';
import { endpoints } from 'src/apis/endpoints.ts';
import { Product } from 'src/interfaces/product.ts';

export const productApi = api.injectEndpoints({
  endpoints: builder => ({
    product: builder.query<Product, number>({
      query: id => ({
        url: endpoints.PRODUCT(id),
        method: 'GET',
      }),
    }),
    products: builder.query<Product[], void>({
      query: () => ({
        url: endpoints.PRODUCTS,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useProductQuery,
  useProductsQuery,
} = productApi;
