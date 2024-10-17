import React from 'react'
import { twMerge } from 'tailwind-merge'

function Button({children, onClick, styles, type,size, disabled, isLoading, ...rest}) {
  return (
    <button className={twMerge(`text-[var(--color-light)] rounded-sm active:-translate-y-1 transition-all ${size === "large" ? "px-6 pt-2 pb-3" : "px-4 pt-1 pb-2"}`, styles)} type={type} disabled={disabled} onClick={onClick}>{children}</button>
  )
}

export default Button