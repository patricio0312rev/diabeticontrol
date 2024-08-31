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
      <label className="block text-sm font-semibold text-theme-secondary-700 mb-1">
        {label}
      </label>
      <p className="text-lg font-medium text-theme-secondary-900">{value}</p>
    </div>
  );
};
