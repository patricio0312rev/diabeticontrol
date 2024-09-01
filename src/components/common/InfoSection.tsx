import React from "react";

export const InfoSection = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-theme-secondary-700">
        {label}
      </label>
      <p className="text-base font-medium text-theme-secondary-900">{value}</p>
    </div>
  );
};
