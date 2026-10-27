import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, AuthResponse, User } from "../types/types";
import type { RootState } from "../store/store";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
    }),

    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getMe: builder.query<User, void>({
      query: () => "auth/me",
    }),
  }),
});

export const { useGetProductsQuery, useLoginMutation, useGetMeQuery } =
  productsApi;
