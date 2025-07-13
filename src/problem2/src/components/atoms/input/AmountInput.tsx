import { forwardRef, type ComponentType } from "react";
import MaskInput, { type MaskInputProps } from "./MaskInput";
import type { InputEvent } from "@/types/ui";

export type AmountInputProps = Omit<MaskInputProps, "value" | "onChange"> & {
  value?: number;
  onChange?: (event: InputEvent<number>) => void;
};

const AmountInput = forwardRef<ComponentType<MaskInputProps>, AmountInputProps>(
  (props, ref) => {
    const { value, name, className, readOnly, onChange } = props;

    return (
      <MaskInput
        ref={ref}
        unmask="typed"
        radix="."
        mapToRadix={[".", ","]}
        thousandsSeparator=","
        scale={2}
        mask={Number}
        readOnly={readOnly}
        className={className}
        value={value?.toString()}
        onAccept={(value) => {
          onChange?.({
            target: {
              name: name || "",
              value: Number(value),
            },
          });
        }}
      />
    );
  }
);

export default AmountInput;
