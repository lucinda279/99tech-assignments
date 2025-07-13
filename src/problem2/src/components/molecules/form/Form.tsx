import type { DOMAttributes } from "react";

import {
  type FieldValues,
  type FormProviderProps,
  FormProvider,
} from "react-hook-form";

type FormProps<
  TFormValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined
> = FormProviderProps<TFormValues, TContext, TTransformedValues> & {
  formId?: string;
  className?: string;
  onSubmit?: DOMAttributes<HTMLFormElement>["onSubmit"];
};

const Form = <
  TFormValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined
>(
  props: FormProps<TFormValues, TContext, TTransformedValues>
) => {
  const { formId, className, children, onSubmit, ...restProps } = props;

  return (
    <FormProvider {...restProps}>
      <form id={formId} className={className} onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
