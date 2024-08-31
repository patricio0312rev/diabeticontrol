import React from 'react'
import { twMerge } from 'tailwind-merge';

export const Container = ({
    className,
    children
}: {
    className?: string;
    children: React.ReactNode;
}) => {
  return (
    <div className={twMerge('relative bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md mx-4', className)}>{children}</div>
  )
}
