import React from "react";
import ProjectMiniPreview from "./ProjectMiniPreview";
import Spinner from "./Spinner";

function RenderProjectsData({
  projects,
  isAuthenticated,
  isLoading,
  renderUserInfo,
}) {
  if (isLoading) return <Spinner />;
  return (
    <div className="flex gap-5 flex-wrap items-center py-4  justify-center  relative bg-[var(--bg-primary)] md:flex-row flex-col text-[var(--color-primary)] font-semibold ">
      {projects?.map((project) => (
        <ProjectMiniPreview
          renderUserInfo={renderUserInfo}
          key={project.projectId}
          project={project}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
}

export default RenderProjectsData;
