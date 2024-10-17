import React from "react";
import { useParams } from "react-router-dom";
import RenderUserProjects from "./RenderUserProjects";
import RenderAppreciations from "./RenderAppreciations";
import useUser from "../features/authentication/useUser";

function ProjectsLayout({ userId, isAuthenticated, renderUserInfo, renderOperations }) {
  const { user } = useUser();
const {id} = user || {};
  const { projectsType } = useParams();
  return (
    <section className="pt-4">
      {projectsType === "appreciations" ? (
        <RenderAppreciations
          isAuthenticated={isAuthenticated}
          userId={userId}
        />
      ) : (
        <RenderUserProjects
          isAuthenticated={isAuthenticated}
          renderOperations={renderOperations}
          renderUserInfo={renderUserInfo}
          userId={userId}
          verifyId={id}
        />
      )}
    </section>
  );
}

export default ProjectsLayout;
