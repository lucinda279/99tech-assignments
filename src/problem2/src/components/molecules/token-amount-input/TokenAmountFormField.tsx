import { type Control, type FieldError, type Path } from "react-hook-form";

import { FormField as FormController } from "@/libs/ui/form";
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
    <FormController
      control={control}
      name={name}
      render={({
        field: { onChange: onFormValueChange, ...restFormFields },
        fieldState,
      }) => {
        let errors: FieldError[] = [];

        if (fieldState.error) {
          if ("amount" in fieldState.error) {
            errors.push(fieldState.error.amount as FieldError);
          }

          if ("currency" in fieldState.error) {
            errors.push(fieldState.error.currency as FieldError);
          }
        }

        return (
          <FormField
            className={className}
            required={required}
            helperText={helperText}
            error={errors.map((error) => error.message).join(", ")}
          >
            <TokenAmountInput
              label={label}
              error={!!errors.length}
              onChange={(event) => {
                onChange?.(event);
                onFormValueChange(event);
              }}
              {...restProps}
              {...restFormFields}
            />
          </FormField>
        );
      }}
    />
  );
};

export default TokenAmountFormField;
