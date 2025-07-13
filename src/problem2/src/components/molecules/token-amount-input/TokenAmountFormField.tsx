import { type Control, type Path } from "react-hook-form";

import { FormField as UiFormField } from "@/libs/ui/form";
import FormField, {
  type FormFieldProps,
} from "@/components/molecules/form/FormField";
import type { TokenAmountInputProps } from "./TokenAmountInput";
import TokenAmountInput from "./TokenAmountInput";

type TokenAmountFormField<TFormValues extends object> = Omit<
  TokenAmountInputProps,
  "name"
> &
  Omit<FormFieldProps, "children"> & {
    name: Path<TFormValues>;
    control: Control<TFormValues>;
  };

const TokenAmountFormField = <TFormValues extends object>(
  props: TokenAmountFormField<TFormValues>
) => {
  const {
    control,
    required,
    name,
    label,
    helperText,
    className,
    onChange,
    ...restProps
  } = props;

  return (
    <UiFormField
      control={control}
      name={name}
      render={({
        field: { onChange: onFormValueChange, ...restFormFields },
        fieldState,
      }) => (
        <FormField
          required={required}
          helperText={helperText}
          error={fieldState.error?.message}
          className={className}
        >
          <TokenAmountInput
            label={label}
            error={!!fieldState.error?.message}
            onChange={(event) => {
              onChange?.(event);
              onFormValueChange(event);
            }}
            {...restProps}
            {...restFormFields}
          />
        </FormField>
      )}
    />
  );
};

export default TokenAmountFormField;
