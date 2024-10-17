import React from 'react'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className='flex flex-col gap-4 text-[var(--color-primary)] text-4xl font-semibold items-center justify-center h-screen pb-10'>

<p>Page Not Found</p>
<Link to={`/`}><button className='flex gap-2 items-center text-lg text-[var(--color-light)] px-4 py-1  bg-[var(--bg-secondary)]'><FaArrowAltCircleLeft className='mt-1' />
Dashboard</button></Link>

    </div>
  )
}

export default PageNotFound