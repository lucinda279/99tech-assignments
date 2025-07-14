import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { useDebounceCallback } from "usehooks-ts";

import { Button, Typography } from "@/components/atoms";
import { Form, TokenAmountFormField } from "@/components/molecules";
import { useGetPricesQuery } from "@/redux/price/priceApiSlice";
import { sortByField } from "@/utils/array.utils";
import {
  currencySwapSchema,
  type CurrencySwapValues,
  type Price,
} from "@/types/currency.types";
import type { InputEvent } from "@/types/ui.types";
import type { CurrencyOption } from "@/components/molecules/currency-select/CurrencySelect";
import type { TokenAmountInputValue } from "@/components/molecules/token-amount-input/TokenAmountInput";
import {
  FAKE_LOADING_TIME,
  INPUT_DEBOUNCE_TIME,
} from "@/constants/ui.constants";

const SwapForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [calculatePayAmount, setCalculatePayAmount] = useState(false);
  const [calculateReceiveAmount, setCalculateReceiveAmount] = useState(false);

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

    return Object.values(pricesMapping).map((x) => ({
      code: x.currency,
      label: x.currency,
      value: x.price,
    })) as CurrencyOption[];
  }, [pricesMapping]);

  const form = useForm<CurrencySwapValues>({
    resolver: zodResolver(currencySwapSchema),
    mode: "onChange",
    defaultValues: {
      pay: {
        amount: 1,
        currency: "USD",
      },
      receive: {
        amount: 1,
        currency: "USD",
      },
    },
  });

  const {
    control,
    formState: { isValid },
    watch,
    setValue,
    handleSubmit,
  } = form;

  const watchedPay = watch("pay");
  const watchedReceive = watch("receive");

  const handleSwitch = () => {
    const { pay: from, receive: to } = form.getValues();

    const nextFromValue = {
      amount: from.amount,
      currency: to.currency,
    };

    const nextToValue = {
      amount: from.amount,
      currency: from.currency,
    };

    setValue("pay", nextFromValue);
    setValue("receive", nextToValue);
  };

  const handleCalculateSwapAmount = async (
    pay: CurrencySwapValues["pay"],
    receive: CurrencySwapValues["receive"]
  ) => {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LOADING_TIME));

    const payPrice = pricesMapping[pay.currency]?.price;
    const receivePrice = pricesMapping[receive.currency]?.price;

    if (!payPrice || !receivePrice) return undefined;

    const payAmount = pay.amount;
    const receiveAmount = (payAmount * payPrice) / receivePrice;

    return {
      amount: Number(receiveAmount.toFixed(2)),
      currency: receive.currency,
    };
  };

  const handleChangePayAmount = useDebounceCallback(
    async (event: InputEvent<TokenAmountInputValue>) => {
      const { amount, currency } = event.target.value;

      if (!amount || !currency) return;

      setCalculateReceiveAmount(true);

      const nextToValue = await handleCalculateSwapAmount(
        { amount, currency },
        watchedReceive
      );

      if (nextToValue) {
        setValue("receive", nextToValue);
      }

      setCalculateReceiveAmount(false);
    },
    INPUT_DEBOUNCE_TIME
  );

  const handleChangeReceiveAmount = useDebounceCallback(
    async (event: InputEvent<TokenAmountInputValue>) => {
      const { amount, currency } = event.target.value;

      if (!amount || !currency) return;

      setCalculatePayAmount(true);

      const nextFromValue = await handleCalculateSwapAmount(
        {
          amount,
          currency,
        },
        watchedPay
      );

      if (nextFromValue) {
        setValue("pay", nextFromValue);
      }

      setCalculatePayAmount(false);
    },
    INPUT_DEBOUNCE_TIME
  );

  const handleSwap = async (_: CurrencySwapValues) => {
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, FAKE_LOADING_TIME));

    toast.success("Swap successful", {
      description: "You have successfully swapped your tokens",
    });

    setSubmitting(false);
  };

  return (
    <Form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(handleSwap)}
      {...form}
    >
      <div className="flex flex-col items-center">
        <TokenAmountFormField
          className="w-full bg-gray-100 dark:bg-neutral-800 rounded-lg p-3"
          name="pay"
          label="You pay"
          control={control}
          balance={100000}
          currencies={currencyOptions}
          loading={calculatePayAmount}
          onChange={handleChangePayAmount}
        />

        <div className="w-fit h-fit bg-gray-100 dark:bg-neutral-800 rounded-full p-1 -m-3 z-10">
          <Button
            className="w-fit h-fit !p-2 !rounded-full border-none text-gray-500 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-background"
            variant="outline"
            onClick={handleSwitch}
          >
            <ArrowUpDown className="!w-4 !h-4 shrink-0" />
          </Button>
        </div>

        <TokenAmountFormField
          className="w-full bg-gray-100 dark:bg-neutral-800 rounded-lg p-3"
          name="receive"
          label="You receive"
          control={control}
          currencies={currencyOptions}
          loading={calculateReceiveAmount}
          onChange={handleChangeReceiveAmount}
        />
      </div>

      {isValid && (
        <Typography className="text-gray-500 dark:text-gray-200">
          {`${watchedPay.amount.toLocaleString()} ${
            watchedPay.currency
          } = ${watchedReceive.amount?.toLocaleString()} ${
            watchedReceive.currency
          }`}
        </Typography>
      )}

      <Button
        className="w-full"
        type="submit"
        disabled={!isValid}
        isLoading={submitting}
      >
        Swap
      </Button>
    </Form>
  );
};

export default SwapForm;
