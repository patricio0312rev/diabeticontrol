import React from "react";
import { twMerge } from "tailwind-merge";
import cn from "classnames";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  wrapperClassName?: string;
  placeholder: string;
  label: string;
  trailingIcon?: React.ReactNode;
}

export const TextInput = ({
  className,
  wrapperClassName,
  placeholder,
  label,
  id,
  trailingIcon,
  ...props
}: TextInputProps) => {
  return (
    <div className={twMerge("space-y-1 sm:space-y-2", wrapperClassName)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-theme-secondary-700"
      >
        {label}
      </label>
      <div
        className={cn({
          relative: trailingIcon,
        })}
      >
        <input
          id={id}
          name={id}
          placeholder={placeholder}
          className={twMerge(
            "w-full px-3 py-2 text-sm sm:text-base border border-theme-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary-500 focus:border-theme-primary-200",
            cn(
              {
                "pr-10": trailingIcon,
              },
              className
            )
          )}
          {...props}
        />
        {trailingIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {trailingIcon}
          </div>
        )}
      </div>
    </div>
  );
};
