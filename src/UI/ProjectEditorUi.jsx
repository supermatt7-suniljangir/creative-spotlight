import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProjectEditorPhase1 from "./ProjectEditorPhase1";
import ProjectEditorPhase2 from "./ProjectEditorPhase2";
import useUser from "../features/authentication/useUser";
import { useProject } from "../features/projects/useProject";
import Spinner from "./Spinner";

function ProjectEditorUi() {
 

  const [phase, setPhase] = useState(1);
  const [data, setData] = useState({});
  const {
    isAuthenticated,
    isLoading: isLoadingUser,
    user: { id } = {},
  } = useUser();

  const { projectId } = useParams();
  const isEditingSession = projectId ? true : false;

  const { isLoading, project } = isEditingSession
    ? useProject(projectId)
    : { isLoading: false, project: null };

  useEffect(() => {
    if (isEditingSession) {
      setData(project);
    }
  }, [project]);

if(isLoading) return <Spinner/>

  return (
    <>
      {isAuthenticated ? (
        <>
          <ProjectEditorPhase1
          isLoading={isLoading}
            data={data}
            setData={setData}
            phase={phase}
            setPhase={setPhase}
            isEditingSession={isEditingSession}
          />
          {phase === 2 && (
            <ProjectEditorPhase2
            isEditingSession={isEditingSession}
              data={data}
              setData={setData}
              setPhase={setPhase}
              userId={id}
            />
          )}
        </>
      ) : (
        <h1> You need to be logged in to create or edit a project</h1>
      )}
    </>
  );
}

export default ProjectEditorUi;
