import React, { useState } from "react";
import { useLogin } from "../features/authentication/useLogin";
import Spinner from "./Spinner";

function RecruiterWindow() {
  const {
    login,
    isPending: isLoggingin,
    isSuccess: isSuccessLogin,
  } = useLogin();
  const [openDirectLoginWindow, setOpenDirectLoginWindow] = useState(false);
  if (isLoggingin) return <Spinner />;
  return (
    <div>
      <div className="text-[var(--color-primary)] text-lg absolute right-4 top-4 font-medium flex items-center gap-2">
        <input
          type="checkbox"
          checked={openDirectLoginWindow}
          onChange={() => setOpenDirectLoginWindow((open) => !open)}
          class="w-7 h-7"
        />
        <p>I am a recruiter, skip login</p>
      </div>

      {openDirectLoginWindow && (
        <div className="fixed p-4 flex justify-center flex-col items-center gap-4 right-8 top-12 rounded-sm w-auto sm:w-auto md:w-1/4 aspect-video bg-[var(--bg-secondary)] pb-6">
          <p className="text-center font-medium text-2xl">
            Are you a Recruiter?
          </p>
          <button
            className="bg-[var(--bg-quaternary)] w-fit text-[var(--color-primary)] font-medium px-6 py-1 rounded-sm"
            onClick={() =>
              login({ email: "test@example.com", password: "12345678" })
            }
          >
            Direct Login
          </button>
        </div>
      )}
    </div>
  );
}

export default RecruiterWindow;
