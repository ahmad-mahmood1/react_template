import { api } from 'src/apis/api.ts';
import { endpoints } from 'src/apis/endpoints.ts';

interface Terms {
  name: string;
  details: string;
  version: string;
  is_latest: boolean;
  agreement_type: string;
}

interface Agreement {
  id: number;
  terms: Terms;
  user_profile: string;
  signed_at: string | null;
}

export const agreementsApi = api.injectEndpoints({
  endpoints: builder => ({
    agreements: builder.query<Agreement[], void>({
      query: () => ({
        url: endpoints.AGREEMENTS,
        method: 'GET',
      }),
      providesTags: ['Agreements'],
    }),
    signAgreements: builder.mutation({
      query: agreementIds => ({
        url: endpoints.AGREEMENTS,
        method: 'POST',
        body: { user_agreement_ids: agreementIds },
      }),
      invalidatesTags: ['Agreements'],
    }),
  }),
});

export const { useAgreementsQuery, useSignAgreementsMutation } = agreementsApi;
