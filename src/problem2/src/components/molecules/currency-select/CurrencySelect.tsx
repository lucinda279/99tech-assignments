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
        <SelectTrigger ref={ref} className={cn("rounded-full p-1", className)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <img
                className="w-6 h-6 shrink-0"
                src={`${import.meta.env.VITE_TOKEN_ICONS_URL}/${
                  option.value
                }.svg`}
                alt={option.label}
              />
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

export default CurrencySelect;
