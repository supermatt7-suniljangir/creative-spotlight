import React from "react";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import useLikeProjects from "../features/projects/useLikeProjects";

function LikeButton({
  liked,
  setLiked,
  setCount,
  likes,
  styles,
  iconColor,
  iconSize,
  userId, 
  projectId,
}) {

const { handleLike, isPending, isSuccess} = useLikeProjects();

  function handleUpdateLike() {
    handleLike({userId, projectId, likes, liked});
  }

  return (
    <button
      disabled={isPending}
      className={twMerge(
        "border-2 border-[var(--color-primary)] rounded-full  active:-translate-y-2 transition-all box-content",
        styles
      )}
      onClick={handleUpdateLike}
    >
      {liked ? (
        <BiSolidLike
          className={`text-${
            iconColor ? iconColor : "[var(--color-primary)]"
          } box-content p-2 ${iconSize ? iconSize : "text-4xl"}`}
          onClick={() => setCount((count) => count - 1)}
        />
      ) : (
        <BiLike
          className={`text-${
            iconColor ? iconColor : "[var(--color-primary)]"
          } box-content p-2 ${iconSize ? iconSize : "text-4xl"}`}
          onClick={() => setCount((count) => count + 1)}
        />
      )}
    </button>
  );
}

export default LikeButton;
