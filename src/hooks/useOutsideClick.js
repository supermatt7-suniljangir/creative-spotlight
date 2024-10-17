import React, { useEffect, useRef } from 'react';

function useOutsideClick(ref, close, buttonRef) {
  useEffect(() => {
    function handleClick(e) {
      // Ensure the click is outside both the menu and the button
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        (!buttonRef.current || !buttonRef.current.contains(e.target))
      ) {
        close();
      }
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [close, ref, buttonRef]);
}

export default useOutsideClick;
