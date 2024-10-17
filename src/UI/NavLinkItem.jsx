import React from 'react'
import { NavLink } from 'react-router-dom'

function NavLinkItem({isOpen, text, styles, children, to}) {
return <NavLink to={to}  className={` flex space-x-4 border-b-[1px] border-b-[var(--color-secondary)] items-center  ${isOpen ? "justify-start" : "justify-center"} w-[100%] flex items-center  px-4 py-3`}>
{children}
{isOpen && <span className="text-md -mt-1">{text}</span>}
</NavLink>
}

export default NavLinkItem;
