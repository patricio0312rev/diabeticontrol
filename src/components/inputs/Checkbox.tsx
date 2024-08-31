import React from 'react'
import { twMerge } from 'tailwind-merge';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    label: string;
}

export const Checkbox = ({
    className,
    label,
    id,
    ...props
}: CheckboxProps) => {
  return (
    <div className={twMerge("flex items-center", className)}>
        <input 
            id={id} 
            name={id} 
            type="checkbox" 
            className="h-4 w-4 text-theme-primary-600 focus:ring-theme-primary-500 border-theme-secondary-300 rounded"
            {...props}
        />

        <label htmlFor={id} className="ml-2 block text-sm text-theme-secondary-700 cursor-pointer">{label}</label>
    </div>
  )
}
