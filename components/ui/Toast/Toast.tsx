import React, { startTransition } from "react";
import { Transition } from "@headlessui/react";
import cn from "classnames";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const icons = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

const classes = {
  success: "bg-green-800",
  error: "bg-red-700",
  warning: "bg-orange-500",
  info: "bg-sky-800",
};

interface ToastProps {
  isVisible: boolean;
  message: string;
  status: "success" | "error" | "info" | "warning" | null;
  onClose: () => void;
  className?: string;
}

const Toast = ({
  isVisible,
  message,
  status,
  onClose,
  className,
}: ToastProps) => {
  const Icon = icons[status || "success"];
  return (
    <Transition
      show={isVisible}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-100 ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={cn(
          "fixed left-[50%] -translate-x-1/2 top-[5vh] w-[86vw] sm:w-[70vw] md:max-w-lg flex p-4 text-gray-700 bg-white border-l-[3px] items-center justify-between shadow-md",
          {
            "border-green-800": status === "success",
            "border-red-700": status === "error",
            "border-orange-500": status === "warning",
            "border-sky-800": status === "info",
          },
          className
        )}
        role='alert'
        aria-live="polite"
        aria-describedby="message"
        aria-label='toast'
      >
        <div className="flex-1 flex space-x-3">
          <Icon
            className={cn("w-6 h-6", {
              "text-green-800": status === "success",
              "text-red-700": status === "error",
              "text-orange-500": status === "warning",
              "text-sky-800": status === "info",
            })}
          />
          <p id='message' className="truncate">{message}</p>
        </div>
        <div className="shrink-0 cursor-pointer" onClick={onClose}>
          <XMarkIcon className="w-6 h-6" />
        </div>
      </div>
    </Transition>
  );
};

export default Toast;
