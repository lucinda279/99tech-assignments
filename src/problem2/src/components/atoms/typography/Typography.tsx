import {
  type CSSProperties,
  type ReactNode,
  createElement,
  forwardRef,
} from "react";

import { type VariantProps, cva } from "class-variance-authority";

export const typographyVariants = cva("font-sans", {
  variants: {
    variant: {
      h1: "text-6xl font-semibold leading-normal",
      h2: "text-5xl font-semibold leading-normal",
      h3: "text-4xl font-semibold leading-normal",
      h4: "text-3xl font-semibold leading-normal",
      subhead: "text-2xl font-semibold leading-normal tracking-[-0.4px]",
      subhead2: "text-lg font-semibold leading-normal",
      paragraph1: "text-base font-normal",
      paragraph2: "text-sm font-normal",
      caption: "text-[10px] text-muted-foreground tracking-[0.24px] uppercase",
    },
  },
  defaultVariants: {
    variant: "paragraph2",
  },
});

export type TypographyProps = VariantProps<typeof typographyVariants> & {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
};

const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  (props, ref) => {
    const { className = "", variant, children, style } = props;

    const componentType =
      variant && ["h1", "h2", "h3", "h4", "h5", "h6", "span"].includes(variant)
        ? variant
        : "p";

    return createElement(componentType, {
      ref,
      children,
      style,
      className: typographyVariants({ variant, className }),
    });
  }
);

export default Typography;
