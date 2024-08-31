import React from 'react'
import LogoIcon from '@/app/assets/svgs/logo.svg'
import { twMerge } from 'tailwind-merge'

export const Logo = ({ className }: {className?: string}) => {
  return (
    <LogoIcon className={twMerge("h-12 w-12 text-white group-hover:text-theme-primary-600 transition-all ease-in-out duration-300", className)} />
  )
}
