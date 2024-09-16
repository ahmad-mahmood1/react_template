import { api } from 'src/apis/api.ts';
import { endpoints } from 'src/apis/endpoints.ts';

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    profile: builder.query({
      query: id => ({
        url: endpoints.USER(id),
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, firstName, lastName }) => ({
        url: endpoints.USER(id),
        method: 'PATCH',
        body: { first_name: firstName, last_name: lastName },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useProfileQuery,
  useUpdateUserMutation,
} = userApi;
