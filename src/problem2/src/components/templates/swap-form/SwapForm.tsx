import * as z from "zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";

import { Button, Typography } from "@/components/atoms";
import { Form, TokenAmountFormField } from "@/components/molecules";
import { useGetPricesQuery } from "@/redux/price/priceApiSlice";
import { sortByField } from "@/utils/array";
import type { Price } from "@/types/price";
import type { InputEvent } from "@/types/ui";
import type { CurrencyOption } from "@/components/molecules/currency-select/CurrencySelect";
import type { TokenAmountInputValue } from "@/components/molecules/token-amount-input/TokenAmountInput";

const formSchema = z.object({
  from: z.object({
    amount: z.number().min(0, "Amount must be greater than 0"),
    currency: z.string().min(1, { message: "Currency is required" }),
  }),
  to: z.object({
    amount: z.number().min(0, "Amount must be greater than 0"),
    currency: z.string().min(1, { message: "Currency is required" }),
  }),
});

export type SwapFormValues = z.infer<typeof formSchema>;

const SwapForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const { data: prices } = useGetPricesQuery();

  const pricesMapping = useMemo(() => {
    if (!prices) return {};

    return sortByField(prices, "date", "desc").reduce((acc, price) => {
      if (!acc[price.currency]) {
        acc[price.currency] = price;
      }

      return acc;
    }, {} as Record<string, Price>);
  }, [prices]);

  const currencyOptions = useMemo(() => {
    if (!pricesMapping) return [];

    return Object.values(pricesMapping).map((price) => ({
      label: price.currency,
      value: price.currency,
    })) as CurrencyOption[];
  }, [pricesMapping]);

  const form = useForm<SwapFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      from: {
        amount: 1,
        currency: "USD",
      },
      to: {
        amount: 1,
        currency: "USD",
      },
    },
  });

  const {
    control,
    formState: { isValid, isDirty },
    watch,
    setValue,
    handleSubmit,
  } = form;

  const watchedFrom = watch("from");
  const watchedTo = watch("to");

  const handleSwitch = () => {
    const { from, to } = form.getValues();

    const nextFromValue = {
      amount: from.amount,
      currency: to.currency,
    };

    const nextToValue = {
      amount: from.amount,
      currency: from.currency,
    };

    setValue("from", nextFromValue);
    setValue("to", nextToValue);
  };

  const handleCalculateSwapAmount = (
    from: SwapFormValues["from"],
    to: SwapFormValues["to"]
  ) => {
    const fromPrice = pricesMapping[from.currency]?.price;
    const toPrice = pricesMapping[to.currency]?.price;

    if (!fromPrice || !toPrice) return undefined;

    const fromAmount = from.amount;
    const toAmount = (fromAmount * fromPrice) / toPrice;

    return {
      amount: Number(toAmount.toFixed(2)),
      currency: to.currency,
    };
  };

  const handleChangeFromAmount = (event: InputEvent<TokenAmountInputValue>) => {
    const { amount, currency } = event.target.value;

    if (!amount || !currency) return;

    const nextToValue = handleCalculateSwapAmount(
      { amount, currency },
      watchedTo
    );

    if (!nextToValue) return;

    setValue("to", nextToValue);
  };

  const handleChangeToCurrency = (event: InputEvent<TokenAmountInputValue>) => {
    const { amount, currency } = event.target.value;

    if (!amount || !currency) return;

    const nextFromValue = handleCalculateSwapAmount(
      {
        amount,
        currency,
      },
      watchedFrom
    );

    if (!nextFromValue) return;

    setValue("from", nextFromValue);
  };

  const handleSwap = async (values: SwapFormValues) => {
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Swap successful", {
      description: "You have successfully swapped your tokens",
    });

    setSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-4 w-fit p-6 bg-background rounded-lg shadow-xl">
      <div>
        <Typography variant="subhead">Swap</Typography>
      </div>

      <Form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit(handleSwap)}
        {...form}
      >
        <div className="flex flex-col items-center">
          <TokenAmountFormField
            className="bg-gray-100 rounded-lg p-3"
            name="from"
            label="You pay"
            control={control}
            balance={100000}
            currencies={currencyOptions}
            onChange={handleChangeFromAmount}
          />

          <div className="w-fit h-fit bg-gray-100 rounded-full p-1 -m-3 z-10">
            <Button
              className="w-fit h-fit !p-2 !rounded-full border-none text-gray-500 hover:text-gray-900 hover:bg-background"
              variant="outline"
              onClick={handleSwitch}
            >
              <ArrowUpDown className="!w-4 !h-4 shrink-0" />
            </Button>
          </div>

          <TokenAmountFormField
            className="bg-gray-100 rounded-lg p-3"
            name="to"
            label="You receive"
            balance={50000}
            control={control}
            currencies={currencyOptions}
            onChange={handleChangeToCurrency}
          />
        </div>

        <Typography className="text-gray-500">
          {`${watchedFrom.amount.toLocaleString()} ${
            watchedFrom.currency
          } = ${watchedTo.amount?.toLocaleString()} ${watchedTo.currency}`}
        </Typography>

        <Button
          className="w-full"
          type="submit"
          disabled={!isValid || !isDirty}
          isLoading={submitting}
        >
          Swap
        </Button>
      </Form>
    </div>
  );
};

export default SwapForm;
