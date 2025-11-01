import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./progress.module.scss";

import { cn } from "@/lib/utils";

const progressVariants = cva("", {
  variants: {
    variant: {
      neutral: styles.neutral,
      success: styles.success,
      error: styles.error,
      warning: styles.warning,
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

function Progress({
  className,
  value,
  variant,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants>) {
  const percentage = value || 0;
  const isFull = percentage >= 100;
  
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(progressVariants({ variant, className }))}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(progressVariants({ variant, className }))}
        {...props}
        style={
          isFull
            ? { transform: `translateX(-${100 - percentage}%)` }
            : { width: `${percentage}%` }
        }
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
