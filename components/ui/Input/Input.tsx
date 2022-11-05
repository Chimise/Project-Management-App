import React, { forwardRef } from "react";
import cn from "classnames";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        className={cn(
          "py-2 px-3 bg-white transition-all duration-500 border-2 w-auto focus:w-[300px] sm:focus:w-[350px] border-x-transparent border-t-transparent border-b-gray-200 focus:rounded-[4px] focus:outline-0 focus:border-sky-800 inline-block placeholder-gray-500 placeholder:text-lg placeholder:font-light",
          className
        )}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
