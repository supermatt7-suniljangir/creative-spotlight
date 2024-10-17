import React, {useState, useRef} from 'react'
import useOutsideClick from '../hooks/useOutsideClick';
import {  FaShareAltSquare } from "react-icons/fa";
import ShareMenu from './ShareMenu';

function ShareWindow({projectId}) {
    const [openShareMenu, setOpenShareMenu] = useState(false);
    const shareBtnRef = useRef(null);
    const shareMenuRef = useRef(null);
    useOutsideClick(
        shareMenuRef,
        () => setOpenShareMenu((open) => !open),
        shareBtnRef
      );
  return (
    <>
    <button
    ref={shareBtnRef}
    onClick={() => setOpenShareMenu((open) => !open)}
    className="text-[var(--color-primary)] absolute right-20 top-2.5 text-3xl"
  >
    <FaShareAltSquare />
  </button>
  {openShareMenu && (
    <ShareMenu
      reference={shareMenuRef}
      styles={`right-36  bg-[var(--bg-secondary)]`}
      destinationurl={`https://creativespotlight.netlify.app/projects/${projectId}`}
    />
  )}
   </>
  )
}

export default ShareWindow