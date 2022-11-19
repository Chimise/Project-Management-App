import React from "react";
import Spinner, { SpinnerProps } from "../../ui/Spinner";
import cn from "classnames";

interface LoadingProps extends SpinnerProps {
    spinnerClassName?: string;
}

const Loading = ({ className, spinnerClassName, ...props }: LoadingProps) => {
  return (
    <div className={cn("w-full flex items-center justify-center", className)}>
      <Spinner className={spinnerClassName} {...props} />
    </div>
  );
};

export default Loading;
