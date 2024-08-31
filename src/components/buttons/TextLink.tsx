import Link, { LinkProps } from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface TextLinkProps extends LinkProps {
  text: string;
  className?: string;
}

export const TextLink = ({ text, className, ...props }: TextLinkProps) => {
  return (
    <Link
      className={twMerge(
        "font-medium text-theme-primary-600 hover:text-theme-primary-500",
        className
      )}
      {...props}
    >
      {text}
    </Link>
  );
};
