import React from "react";
import { twMerge } from "tailwind-merge";
import { Navbar } from "./Navbar";

export const AnimatedContainer = ({
  children,
  withNavbar = false,
  className,
}: {
  children: React.ReactNode;
  withNavbar?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "min-h-screen flex relative overflow-hidden",
        className
      )}
    >
      {withNavbar && <Navbar />}
      <div className="absolute inset-0 bg-radial-gradient bg-200 animate-gradient-bg" />
      {children}
    </div>
  );
};
