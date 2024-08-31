import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text: string;
}

export const Button = ({ className, text, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "w-full bg-theme-primary-600 hover:bg-theme-primary-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 text-sm sm:text-base disabled:bg-theme-secondary-300 disabled:text-theme-secondary-500 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {text}
    </button>
  );
};
