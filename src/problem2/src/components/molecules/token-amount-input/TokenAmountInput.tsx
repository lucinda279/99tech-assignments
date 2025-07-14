import { useMemo } from "react";

import { type InputEvent } from "@/types/ui.types";
import { AmountInput, Typography } from "@/components/atoms";
import CurrencySelect, {
  type CurrencyOption,
} from "@/components/molecules/currency-select/CurrencySelect";
import { cn } from "@/utils/ui.utils";

export type TokenAmountInputValue = {
  amount?: number;
  currency?: string;
};

export type TokenAmountInputProps = {
  label?: string;
  name?: string;
  value?: TokenAmountInputValue;
  balance?: number;
  currencies?: CurrencyOption[];
  error?: boolean;
  readonly?: boolean;
  loading?: boolean;
  onChange?: (event: InputEvent<TokenAmountInputValue>) => void;
};

const TokenAmountInput = (props: TokenAmountInputProps) => {
  const {
    label,
    name = "",
    value,
    balance,
    currencies,
    error,
    readonly,
    loading,
    onChange,
  } = props;

  const actualAmount = useMemo(() => {
    if (!value?.currency) return null;

    const currencyValue =
      currencies?.find((x) => x.code === value.currency)?.value ?? 0;

    return (value.amount ?? 0) * currencyValue;
  }, [value, currencies]);

  const handleChangeAmount = (event: InputEvent<number | undefined>) => {
    onChange?.({
      target: {
        name,
        value: {
          amount: event.target.value,
          currency: value?.currency,
        },
      },
    });
  };

  const handleChangeCurrency = (event: InputEvent<string>) => {
    onChange?.({
      target: {
        name,
        value: {
          amount: value?.amount,
          currency: event.target.value,
        },
      },
    });
  };

  return (
    <div className="flex gap-8">
      <div className="flex flex-1 flex-col justify-between gap-1">
        {label && <Typography variant="caption">{label}</Typography>}
        <AmountInput
          className={cn(
            "!bg-transparent w-36 p-0 border-0 !ring-0 rounded-none shadow-none outline-none !text-lg font-semibold",
            error && "!shadow-[0_1px_0_0_var(--destructive)]",
            !readonly && "focus-visible:shadow-[0_1px_0_0_var(--primary)]",
            loading && "hidden"
          )}
          readOnly={readonly}
          disabled={loading}
          value={value?.amount}
          onChange={handleChangeAmount}
        />
        {loading && (
          <div className="animate-pulse h-5 mt-4 w-full bg-gray-200 dark:bg-neutral-700 rounded-full -translate-y-1.5" />
        )}
        {actualAmount !== null && (
          <Typography variant="caption">
            {`$${actualAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          </Typography>
        )}
      </div>

      <div className="flex flex-col items-end gap-1">
        <Typography variant="caption">
          Balance: {balance ? balance.toLocaleString() : 0}
        </Typography>
        <CurrencySelect
          className="w-28"
          value={value?.currency}
          options={currencies || []}
          onChange={handleChangeCurrency}
        />
      </div>
    </div>
  );
};

export default TokenAmountInput;
