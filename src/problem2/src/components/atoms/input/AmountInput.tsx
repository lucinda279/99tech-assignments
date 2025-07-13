import { forwardRef, type ComponentType } from "react";
import MaskInput, { type MaskInputProps } from "./MaskInput";

export type AmountInputProps = MaskInputProps;

const AmountInput = forwardRef<ComponentType<MaskInputProps>, MaskInputProps>(
  (props, ref) => {
    const { value, className, onChange } = props;

    return (
      <MaskInput
        ref={ref}
        radix="."
        thousandsSeparator=","
        mask={Number}
        scale={2}
        value={value}
        className={className}
        onChange={onChange}
      />
    );
  }
);

export default AmountInput;
