import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useOutsideClick from "../hooks/useOutsideClick";

function ConfirmationWindow({
  actionCancel,
  actionConfirm,
  message,
  btnColor,
  messageColor
}) {
  const windowRef = useRef(null);
  const btnCancelRef = useRef(null);

  useOutsideClick(windowRef, actionCancel, btnCancelRef);

  return (
    <div className="fixed top-0 right-0 z-[100]  h-screen w-screen flex items-center justify-center">
      <div className="bg-[var(--bg-dark)] absolute z-[-1] opacity-90 top-0 right-0 w-full h-full"></div>

      <div
        className="w-3/4 bg-[var(--bg-quaternary)] h-3/4 rounded-lg flex items-center justify-center text-xl text-[var(--color-primary)] px-20 gap-8 flex-col"
        ref={windowRef}
      >
        <div className={messageColor}>{message}</div>
        <div className="flex items-center gap-10">
          <button ref={btnCancelRef} className="text-black" onClick={actionCancel}>
            Cancel
          </button>

          <button
            className={twMerge(
              `bg-[var(--bg-btn-primary)] text-[var(--color-light)] px-4 py-2 rounded-sm`,
              btnColor
            )}
            onClick={actionConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationWindow;
