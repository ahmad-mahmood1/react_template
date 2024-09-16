import { api } from 'src/apis/api.ts';
import { endpoints } from 'src/apis/endpoints.ts';

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: endpoints.LOGIN,
        method: 'POST',
        body: { email, password },
      }),
    }),
    googleLogin: builder.mutation({
      query: ({ accessToken }) => ({
        url: endpoints.LOGIN_WITH_GOOGLE,
        method: 'POST',
        body: { access_token: accessToken },
      }),
    }),
    signup: builder.mutation({
      query: ({ email, password, confirmPassword }) => ({
        url: endpoints.SIGNUP,
        method: 'POST',
        body: { email, password, confirm_password: confirmPassword },
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: endpoints.REQUEST_PASSWORD_RESET,
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ uid, token, password }) => ({
        url: endpoints.RESET_PASSWORD(uid, token),
        method: 'POST',
        body: { password },
      }),
    }),
    activateUser: builder.query({
      query: ({ uid, token }) => ({
        url: endpoints.ACTIVATE_USER(uid, token),
        method: 'GET',
      }),
    }),
    resendActivationEmail: builder.query({
      query: id => ({
        url: endpoints.RESEND_ACTIVATION_EMAIL(id),
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGoogleLoginMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useActivateUserQuery,
  useLazyResendActivationEmailQuery,
} = authApi;
