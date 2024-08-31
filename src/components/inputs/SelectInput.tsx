import React from "react";
import { twMerge } from "tailwind-merge";

export type TabOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectInputProps = {
  id: string;
  className?: string;
  options: TabOption[];
  activeTab: string;
  onChange: (value: string) => void;
};

export const SelectInput = <T,>({
  id = "tabs",
  className,
  options,
  activeTab,
  onChange,
}: SelectInputProps) => {
  return (
    <select
      id={id}
      name={id}
      className={twMerge(
        "block w-full rounded-md border-theme-secondary-300 focus:border-theme-primary-500 focus:ring-theme-primary-500",
        className
      )}
      value={activeTab}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option
          key={option.value as string}
          value={option.value as string}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
