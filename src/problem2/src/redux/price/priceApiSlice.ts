import { apiSlice } from "@/redux/apiSlices";
import type { Price } from "@/types/price";

const getPricesEndpointDef = {
  query: () => ({
    url: `/prices.json`,
  }),
};

const priceApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPrices: build.query<Price[], void>(getPricesEndpointDef),
  }),
  overrideExisting: false,
});

export const { useGetPricesQuery } = priceApiSlice;

export default priceApiSlice;
