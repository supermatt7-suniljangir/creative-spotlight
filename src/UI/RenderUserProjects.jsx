import React from "react";
import { useProjects } from "../features/projects/useProjects";
import RenderProjectsData from "./RenderProjectsData";
import ProjectsTableOperations from "./ProjectsTableOperations";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

function RenderUserProjects({
  isAuthenticated,
  userId,
  renderUserInfo,
  verifyId,
  renderOperations
}) {
  const { isLoading, userProjects } = useProjects(userId);
if(isLoading) return <Spinner/>
  return (
    <div>
      {userProjects && userProjects.length > 0 ? (
        <>
          <h2 className="md:text-4xl text-3xl text-[var(--color-primary)] font-bold capitalize text-center my-8">
            projects
          </h2>
           <ProjectsTableOperations renderOperations={renderOperations} />
          <RenderProjectsData
          
            projects={userProjects}
            renderUserInfo={renderUserInfo}
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
          />
        </>
      ) : (
        <div className="flex items-center justify-center gap-8 flex-col h-auto py-10 text-[var(--color-primary)]">
          <p className="font-medium text-3xl capitalize ">no projects found</p>

          {userId === verifyId && (
            <div>
              {/* a container */}
              <Link to={`/editor/new`} >
                <div className="w-80 aspect-video shadow-lg font-medium flex flex-col justify-center items-center">
                  <IoIosAddCircle className="text-6xl" />
                  <h2 className="text-xl font-semibold">Add a new project</h2>
                </div>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RenderUserProjects;
