import type { ReactNode } from "react";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/libs/ui/form";
import { cn } from "@/utils/ui.utils";

export type FormFieldProps = {
  required?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

const FormField = (props: FormFieldProps) => {
  const { required, label, helperText, error, className, children } = props;

  return (
    <FormItem className={className}>
      <FormLabel>
        {label}
        {label && required && (
          <span className="ml-1 text-xs text-danger">*</span>
        )}
      </FormLabel>
      <FormControl>{children}</FormControl>
      <FormDescription className={cn("text-xs", error && "text-destructive")}>
        {error || helperText}
      </FormDescription>
    </FormItem>
  );
};

export default FormField;
