import { type ChangeEvent } from "react";
import { type InputEvent } from "@/types/ui";
import { AmountInput, Typography } from "@/components/atoms";
import CurrencySelect, {
  type CurrencyOption,
} from "@/components/molecules/currency-select/CurrencySelect";
import { cn } from "@/utils/ui";

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
    onChange,
  } = props;

  const handleChangeAmount = (event: InputEvent<number>) => {
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
    <div className="flex items-end gap-8">
      <div className="flex flex-col gap-1">
        {label && <Typography variant="caption">{label}</Typography>}
        <AmountInput
          className={cn(
            "w-36 p-0 border-0 !ring-0 rounded-none shadow-none outline-none !text-lg font-semibold",
            error && "!shadow-[0_1px_0_0_var(--destructive)]",
            !readonly && "focus-visible:shadow-[0_1px_0_0_var(--primary)]"
          )}
          readOnly={readonly}
          value={value?.amount}
          onChange={handleChangeAmount}
        />
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
