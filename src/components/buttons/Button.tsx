import React from "react";
import { twMerge } from "tailwind-merge";
import cn from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: React.ReactNode | string;
  variant?: "primary" | "secondary";
}

export const Button = ({
  className,
  text,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "w-full font-bold py-2 px-4 rounded-md transition duration-300 text-sm sm:text-base disabled:bg-theme-secondary-300 disabled:text-theme-secondary-500 disabled:cursor-not-allowed",
        cn({
          "bg-theme-secondary-100 text-theme-primary-600 hover:bg-theme-secondary-200 border border-theme-primary-200 shadow-sm":
            variant === "secondary",
          "bg-theme-primary-600 hover:bg-theme-primary-700 text-white":
            variant === "primary",
        }),
        className
      )}
      {...props}
    >
      {text}
    </button>
  );
};
