import React from "react";
import useProfile from "../features/profile/useProfile";
import RenderProjectsData from "./RenderProjectsData";
import useAppreciations from "../features/projects/useAppreciations";
import Spinner from "./Spinner";

function RenderAppreciations({ userId, isAuthenticated }) {
  const { profileData: { profile: { likedProjects } = {} } = {} } =
    useProfile(userId);
  const { data: { data: projects } = {}, isLoading: isLoadingProjects } =
    useAppreciations(likedProjects);
  if (isLoadingProjects) return <Spinner />;
  return (
    <div>
      {projects && projects.length ? (
        <>
          <h2 className="md:text-4xl text-3xl text-[var(--color-primary)] font-bold capitalize text-center my-8">
            Appreciations
          </h2>
          <RenderProjectsData
            renderUserInfo={true}
            projects={projects}
            isAuthenticated={isAuthenticated}
            isLoading={isLoadingProjects}
          />
        </>
      ) : (
        <div className="flex justify-center text-[var(--color-primary)] text-3xl capitalize font-semibold py-20">
          <p>no appreciation found</p>
        </div>
      )}
    </div>
  );
}

export default RenderAppreciations;
