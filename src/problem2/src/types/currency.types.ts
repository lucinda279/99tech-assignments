import { z } from "zod";

export interface Price {
  currency: string;
  date: string;
  price: number;
}

export const currencySwapSchema = z.object({
  pay: z.object({
    amount: z.number().gt(0, { message: "Amount must be greater than 0" }),
    currency: z.string().min(1, { message: "Currency is required" }),
  }),
  receive: z.object({
    amount: z.number().gt(0, "Amount must be greater than 0"),
    currency: z.string().min(1, { message: "Currency is required" }),
  }),
});

export type CurrencySwapValues = z.infer<typeof currencySwapSchema>;
