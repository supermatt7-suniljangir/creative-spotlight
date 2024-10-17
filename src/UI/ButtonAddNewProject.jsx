import React from 'react'
import { IoAddCircleSharp } from "react-icons/io5";
import Button from './Button';
import { Link } from 'react-router-dom';

function ButtonAddNewProject() {
  return (
    <Link to="/editor/new"><Button styles={`right-8 bg-[var(--bg-btn-primary)] text-lg flex items-center gap-2 absolute`}><IoAddCircleSharp className="mt-1" />new project</Button></Link>    )
}

export default ButtonAddNewProject