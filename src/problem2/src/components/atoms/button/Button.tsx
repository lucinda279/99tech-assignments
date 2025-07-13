import { forwardRef } from "react";

import { Loader2 } from "lucide-react";

import {
  Button as UiButton,
  type ButtonProps as UiButtonProps,
} from "@/libs/ui/button";
import { cn } from "@/utils/ui";
import { Typography } from "..";

export type ButtonProps = Omit<UiButtonProps, "prefix"> & {
  isLoading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    isLoading = false,
    disabled,
    children,
    size = "default",
    type = "button",
    className,
    ...restProps
  } = props;

  return (
    <UiButton
      ref={ref}
      type={type}
      size={size}
      disabled={isLoading || disabled}
      className={cn("flex rounded-full cursor-pointer", className)}
      {...restProps}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {typeof children === "string" ? (
        <Typography>{children}</Typography>
      ) : (
        children
      )}
    </UiButton>
  );
});

export default Button;
