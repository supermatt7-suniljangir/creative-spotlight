import React from 'react'
import { MdModeEdit } from "react-icons/md";
import Button from "./Button";
import { FaCheck } from "react-icons/fa";
function ButtonProfileEdit({setIsEditSession, isEditSession, dis}) {
    function toggleEditSession() {
        setIsEditSession((edit) => !edit);
      }
   return <Button
          //  disabled={dis}
            styles="text-lg absolute top-2 right-4 p-2 rounded-full flex items-center space-x-2 bg-[var(--bg-light)] text-[var(--color-primary)] font-semibold cursor-pointer"
            size="small"
            type={isEditSession ? "button" : "submit"}
            onClick={toggleEditSession}
          >
            {isEditSession ? (
              <FaCheck />
            ) : (
              <MdModeEdit className="text-base " />
            )}
          </Button>
}

export default ButtonProfileEdit