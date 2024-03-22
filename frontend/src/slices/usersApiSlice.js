import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

console.log(USERS_URL)

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        // mode: 'no-cors',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    forgot: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'PUT',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({
        query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    address: builder.mutation({
      query: (data) => ({
      url: `${USERS_URL}/address/${data.userId}`,
      method: 'PUT',
      body: data,
      // keepUnusedDataFor: 5,
    }),
    // invalidatesTags: ['User'],
  }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useForgotMutation,
  useProfileMutation,
  useAddressMutation,
  
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} = userApiSlice;
