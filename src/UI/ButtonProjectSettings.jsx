import React, {useRef, useState} from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdCancel, MdDelete,MdEdit  } from "react-icons/md";
import useDeleteProject from "../features/projects/useDeleteProject";
import { useNavigate } from "react-router-dom";

function ButtonProjectSettings({ userId, id, projectId }) {
    const navigate = useNavigate();
  const toggleSettingsRef = useRef(null); // Ref for the button
  const toggleSettingsButtonRef = useRef(null); // Ref for the button
  const [toggleSettings, setToggleSettings] = useState(false);
const {deleteProject, error, isPending, isSuccess} = useDeleteProject();
  useOutsideClick(
    toggleSettingsRef,
    () => setToggleSettings((open) => !open),
    toggleSettingsButtonRef
  );
  return (
 
        <div className=" text-[var(--color-light)] z-[2] flex gap-4 items-start absolute right-6 top-3">
          {toggleSettings && (
            <div
              className="flex flex-col text-xl py-1 bg-[var(--bg-secondary)] gap-2"
              ref={toggleSettingsRef}
            >
              <button className="flex items-center gap-2 px-8" onClick={()=>navigate(`/editor/edit/${projectId}`)}>
                <MdEdit />
                Edit
              </button>
              <hr />
              <button disabled={isPending} className="flex items-center gap-2 px-8" onClick={()=>deleteProject({projectId})}>
                <MdDelete />
                Delete
              </button>
            </div>
          )}

          <button
            ref={toggleSettingsButtonRef}
            className="text-2xl text-[var(--color-primary)] "
            onClick={() => setToggleSettings(!toggleSettings)}
          >
            {toggleSettings ? <MdCancel /> : <BsThreeDotsVertical />}
          </button>
        </div>
     
  );
}

export default ButtonProjectSettings;
