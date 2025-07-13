import {
  createApi,
  fetchBaseQuery,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_CURRENCY_API_KEY,
});

export const apiSlice = createApi({
  baseQuery: (args: string | FetchArgs, api, extraOptions) =>
    baseQuery(args, api, extraOptions),
  endpoints: () => ({}),
});
