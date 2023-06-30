import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type {
  AceptInvitationBody,
  AuthenticationBody,
  AuthenticationResponse,
  CreateUserBody,
  SendInvitationBody,
  ResetPasswordBody,
  ForgotPasswordBody,
  IResponse,
} from '../types'
import { RootState } from '@store'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.API_URL || 'http://localhost:8080',
    prepareHeaders(headers, api) {
      const state = api.getState() as RootState
      const token = state.auth.token ?? localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
    responseHandler: async (response) => {
      const json = await response.json()
      if (response.ok) return json
      return Promise.reject(json?.message)
    },
    validateStatus: (response) => {
      return response.status != 200 || response.status.toString() != "OK"
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<IResponse<AuthenticationResponse>, AuthenticationBody>({
      query: (body) => ({
        url: 'sign-in',
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<IResponse<void>, CreateUserBody>({
      query: (body) => ({
        url: 'sign-up',
        method: 'POST',
        body,
      }),
    }),
    activateUser: builder.mutation<IResponse<void>, string>({
      query: (body) => ({
        url: 'confirm-email',
        method: 'POST',
        body,
      }),
    }),
    sendInvitation: builder.mutation<IResponse<void>, SendInvitationBody>({
      query: (body) => ({
        url: 'send-invitation',
        method: 'POST',
        body,
      }),
    }),
    acceptInvitation: builder.mutation<IResponse<void>, AceptInvitationBody>({
      query: (body) => ({
        url: 'accept-invitation',
        method: 'POST',
        body,
      }),
    }),
    forgotPassword: builder.mutation<IResponse<void>, ForgotPasswordBody>({
      query: (body) => ({
        url: 'forgot-password',
        method: 'POST',
        body: body,
      }),
    }),
    resetPassword: builder.mutation<IResponse<void>, ResetPasswordBody>({
      query: (body) => ({
        url: 'reset-password',
        method: 'POST',
        body: body,
      }),
    }),
  }),
})
    

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useSignUpMutation,
  useSignInMutation,
  useActivateUserMutation,
  useSendInvitationMutation,
  useAcceptInvitationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = api
