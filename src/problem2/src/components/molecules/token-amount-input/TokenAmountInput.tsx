import { type ChangeEvent } from "react";
import { type InputEvent } from "@/types/ui";
import { AmountInput, Typography } from "@/components/atoms";
import CurrencySelect, {
  type CurrencyOption,
} from "@/components/molecules/currency-select/CurrencySelect";

type TokenAmountInputValue = {
  amount?: number;
  currency?: string;
};

type TokenAmountInputProps = {
  label?: string;
  value?: TokenAmountInputValue;
  balance?: number;
  currencies?: CurrencyOption[];
  onChange?: (event: InputEvent<TokenAmountInputValue>) => void;
};

const TokenAmountInput = (props: TokenAmountInputProps) => {
  const { label, value, balance, currencies, onChange } = props;

  const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.({
      target: {
        name: "amount",
        value: {
          amount: Number.isNaN(event.target.value)
            ? undefined
            : Number(event.target.value),
          currency: value?.currency,
        },
      },
    });
  };

  const handleChangeCurrency = (event: InputEvent<string>) => {
    onChange?.({
      target: {
        name: "currency",
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
          className="p-0 border-0 !ring-0 rounded-none shadow-none outline-none !text-lg font-semibold focus-visible:shadow-[0_1px_0_0_var(--primary)]"
          value={value?.amount}
          onChange={handleChangeAmount}
        />
      </div>
      <div className="flex flex-col items-end gap-1">
        <Typography variant="caption">
          Balance: {balance ? balance.toLocaleString() : 0}
        </Typography>
        <CurrencySelect
          value={value?.currency}
          options={currencies || []}
          onChange={handleChangeCurrency}
        />
      </div>
    </div>
  );
};

export default TokenAmountInput;
