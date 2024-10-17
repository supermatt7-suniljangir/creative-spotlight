import React from "react";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
function ProjectMiniPreview({ project, renderUserInfo }) {
  return (
    <Link to={`/projects/${project.projectId}`} className="md:w-[30%] w-[95%] ">
      <div className="w-full shadow-light bg-[var(--bg-quaternary)] pb-4 flex flex-col gap-1 relative">
        <img
          src={project.thumbnail}
          alt="thumbnail"
          className="w-full aspect-[3/2] object-cover"
        />
        <div className="flex space-x-2 items-center justify-between px-4 py-2 w-full">
          <span>{project.title.slice(0, 15)}...</span>
          <span>
            {project.category === "uiux" ? "UI/UX" : project.category}
          </span>
        </div>

        <div className="flex space-x-2 items-center justify-between px-2  w-full">
          {/* <Link to={`/profile/${project.userId}`}> */}
          {renderUserInfo && (
            <div className="flex space-x-2 items-center">
              <img
                src={project?.profiles?.avatar}
                alt="user photo"
                className="w-8 h-8 object-cover rounded-full"
              />
              <span>{project.profiles?.fullName}</span>
            </div>
          )}
          {/* </Link> */}
          <p className=" flex gap-2 items-center">
            <FcLike />
            {project.likes}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProjectMiniPreview;
