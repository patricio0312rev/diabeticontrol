import React from "react";
import { twMerge } from "tailwind-merge";
import cn from "classnames";

type TabOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TabNavigationProps = {
  options: TabOption[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  className?: string;
};

export const TabNavigation: React.FC<TabNavigationProps> = ({
  options,
  activeTab,
  setActiveTab,
  className,
}) => {
  return (
    <nav className={twMerge("flex space-x-4", className)}>
      {options.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          disabled={tab.disabled}
          className={cn(
            "px-4 py-2 font-medium text-sm rounded-md transition-colors duration-200 shadow-sm",
            {
              "bg-theme-primary-600 text-white": activeTab === tab.value,
              "bg-white text-theme-secondary-600 hover:bg-theme-primary-100 hover:text-theme-primary-700":
                activeTab !== tab.value,
              "opacity-50 cursor-not-allowed": tab.disabled,
            }
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};
