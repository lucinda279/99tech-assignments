import { forwardRef, type ComponentType } from "react";
import MaskInput, { type MaskInputProps } from "./MaskInput";

export type AmountInputProps = Omit<MaskInputProps, "value"> & {
  value?: number;
};

const AmountInput = forwardRef<ComponentType<MaskInputProps>, AmountInputProps>(
  (props, ref) => {
    const { value, className, onChange } = props;

    return (
      <MaskInput
        ref={ref}
        radix="."
        thousandsSeparator=","
        mask={Number}
        scale={2}
        value={value?.toString()}
        className={className}
        onChange={onChange}
      />
    );
  }
);

export default AmountInput;
