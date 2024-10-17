import React from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

function Logo({styles, align}) {
  return (
    <Link to="/dashboard" className={`inline-block ${
(align === "center" ? "mx-auto": "" || align === "left" && "mr-auto" || align === "right" && "ml-auto")
    }`} >
        <img src={`/logo.svg`}  className={twMerge('w-12  aspect-square', styles)} />
    </Link>
  )
}

export default Logo;