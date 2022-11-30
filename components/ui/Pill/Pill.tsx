import React, { forwardRef } from "react";
import cn from "classnames";

interface PillProps {
  value?: number;
  className?: string;
}

const Pill = forwardRef<HTMLDivElement, PillProps>(
  ({ value, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "py-px px-4 bg-orange-200 rounded-xl text-sm",
          { "inline-block": value !== 0, hidden: value === 0 || !value },
          className
        )}
        role={'presentation'}
        aria-label='pill'
      >
        {value}
      </div>
    );
  }
);

Pill.displayName = "Pill";

export default Pill;
