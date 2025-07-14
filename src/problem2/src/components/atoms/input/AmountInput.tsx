import { forwardRef } from "react";

import type { InputEvent } from "@/types/ui.types";
import { Input, type InputProps } from "@/libs/ui/input";

export type AmountInputProps = Omit<InputProps, "value" | "onChange"> & {
  value?: number;
  onChange?: (event: InputEvent<number | undefined>) => void;
};

const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  (props, ref) => {
    const { name, onChange, ...restProps } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({
        target: {
          name: name || "",
          value: e.target.value ? Number(e.target.value) : undefined,
        },
      });
    };

    return (
      <Input
        ref={ref}
        type="number"
        name={name}
        onChange={handleChange}
        {...restProps}
      />
    );
  }
);

export default AmountInput;
