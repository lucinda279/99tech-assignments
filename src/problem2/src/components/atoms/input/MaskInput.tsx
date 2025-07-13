import { Input, type InputProps } from "@/libs/ui/input";
import {
  type ComponentType,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type RefAttributes,
} from "react";
import { IMaskMixin, type IMaskInputProps } from "react-imask";

export type MaskInputProps = IMaskInputProps<HTMLInputElement> &
  Omit<InputProps, "value">;

const MaskInput: ForwardRefExoticComponent<
  PropsWithoutRef<MaskInputProps> & RefAttributes<ComponentType<MaskInputProps>>
> = IMaskMixin(({ inputRef, ...props }) => <Input ref={inputRef} {...props} />);

export default MaskInput;
