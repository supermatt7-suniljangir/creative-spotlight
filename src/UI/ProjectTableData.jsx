import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function ProjectTableData({
  thumbnail,
  numCols,
  numLikes,
  rank,
  projectTitle,
  projectId,
  creatorName,
  avatar,
  userId,
  ...rest
}) {
  return (
    <Link className="w-full" to={`/projects/${projectId}`}>
      <div
        className={twMerge(
          `grid md:grid-cols-${numCols} grid-cols-4 w-full bg-[var(--bg-quaternary)] text-[var(--color-primary)] md:px-8 py-2 items-center pl-2`,
          `${
            (rank === 1 && "first ") ||
            (rank === 2 && "second ") ||
            (rank === 3 && "third")
          }`
        )}
      >
        <span className="text-lg font-medium">#{rank}</span>
        <img
          src={`${thumbnail}`}
          className="md:w-16 w-14 aspect-video object-cover"
          alt="project thumbnail"
        />
        <span className="text-sm sm:font-medium">
          {projectTitle.slice(0, 12)}...
        </span>
        <span className="text-lg font-medium">{numLikes}</span>
        <div className="space-x-2 md:flex hidden">
          <img
            src={avatar}
            alt="user photo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-lg font-medium ">
            {creatorName.slice(0, 9)}...
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProjectTableData;
