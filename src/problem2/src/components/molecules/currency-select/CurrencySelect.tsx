import { forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/libs/ui/select";
import { type InputEvent } from "@/types/ui";
import { cn } from "@/utils/ui";
import { Avatar, Typography } from "@/components/atoms";

export type CurrencyOption = {
  value: string;
  label: string;
};

type CurrencySelectProps = {
  name?: string;
  value?: string;
  options: CurrencyOption[];
  className?: string;
  onChange?: (event: InputEvent<string>) => void;
};

const CurrencySelect = forwardRef<HTMLButtonElement, CurrencySelectProps>(
  (props, ref) => {
    const { name, value, options, className, onChange } = props;

    const handleChange = (value: string) => {
      onChange?.({ target: { name: name || "", value } });
    };

    return (
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger
          ref={ref}
          className={cn("rounded-full bg-background p-1", className)}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-64">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <Avatar
                className="w-6 h-6 shrink-0"
                alt={option.label}
                imgUrl={`${import.meta.env.VITE_TOKEN_ICONS_URL}/${
                  option.value
                }.svg`}
              />
              <Typography>{option.label}</Typography>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

export default CurrencySelect;
