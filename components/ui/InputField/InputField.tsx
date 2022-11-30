import React, { useState } from "react";
import cn from "classnames";
import { Transition } from "@headlessui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error: boolean;
  label?: string;
  message?: string;
  rootClassName?: string;
}

const InputField = ({
  className,
  rootClassName,
  message,
  error,
  label,
  type,
  name,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <label className={cn("block space-y-px group", rootClassName)}>
      <span className="block capitalize group-focus-within:font-medium tracking-wide text-gray-600 font-normal text-xs">
        {label || name}
      </span>
      {type === "password" ? (
        <div className="w-full relative">
          <input
            aria-errormessage={`${name}-error`}
            aria-invalid={error ? "true" : "false"}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className={cn(
              "block w-full py-0.5 text-sm border-0 px-0 transition-colors duration-100 placeholder:text-sm placeholder-gray-600 focus:ring-0 border-b-2 border-gray-200 focus:outline-none focus:border-slate-700",
              className
            )}
            type={showPassword ? "text" : "password"}
            name={name}
            {...props}
          />
          <span
            role='button'
            aria-label='view-password'
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute bg-transparent text-gray-400 flex items-center justify-center inset-y-0 right-0 cursor-pointer w-6"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-4 h-4" />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </span>
        </div>
      ) : (
        <input
          aria-errormessage={`${name}-error`}
          aria-invalid={error ? "true" : "false"}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className={cn(
            "block w-full py-0.5 text-sm border-0 px-0 transition-colors duration-100 placeholder:text-sm placeholder-gray-600 focus:ring-0 border-b-2 border-gray-200 focus:outline-none focus:border-slate-700",
            { "placeholder-gray-600": !error, "placeholder-red-800": error },
            className
          )}
          type={type}
          name={name}
          {...props}
        />
      )}
      <span className="relative w-full block">
        <Transition
          as={React.Fragment}
          show={error}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-1"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-1"
          leaveTo="opacity-0"
        >
          <span id={`${name}-error`} aria-live='assertive' className="block absolute !mt-1 -top-0.5 text-red-800 text-xxs tracking-wide font-light">
            {message}
          </span>
        </Transition>
      </span>
    </label>
  );
};

export default InputField;
