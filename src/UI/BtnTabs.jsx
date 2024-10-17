import React from 'react'
import {NavLink} from 'react-router-dom'

function BtnTabs({path, label}) {
  return (
<NavLink to={path} className={({isActive})=>(isActive ? 'w-32 bg-[var(--bg-btn-primary)] px-4 py-2 font-medium text-[var(--color-light)] flex items-center justify-center' : " w-32 flex items-center justify-center font-medium bg-[var(--bg-quaternary)] text-[var(--color-primary)]  px-4 py-2")}>{label}</NavLink>
  )
}

export default BtnTabs;