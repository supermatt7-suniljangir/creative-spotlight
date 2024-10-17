import React from "react";
import ProjectTableData from "./ProjectTableData";
import { useLeaderBoardProjects } from "../features/projects/useLeaderboardProjects";
import Spinner from "./Spinner";

function LeaderBoardProjects() {
  const { leaderboardData, isLoading } = useLeaderBoardProjects();

  if (isLoading) return <Spinner />;

  return (
    <>
      {leaderboardData?.length > 0 ? (
        <div className="flex flex-col space-y-3 mx-auto items-center h-full w-full pt-4 pb-8 md:px-8 px-0 justify-center shadow-dark ">
          <div className="grid grid-cols-4 md:grid-cols-5 w-full md:px-8 px-0  capitalize text-[var(--color-primary)] mb-2 sm:text-xl text-sm md:font-semibold">
            <span>Rank</span>
            <span>Thumbnail</span>
            <span>Title</span>
            <span>Likes</span>
            <span className="md:inline-block hidden">creator</span>
          </div>
          {leaderboardData?.map((item, index) => (
            <ProjectTableData
              numCols={5}
              rank={index + 1}
              key={item.projectId}
              avatar={item.avatar}
              thumbnail={item.thumbnail}
              projectId={item.projectId}
              projectTitle={item.title}
              numLikes={item.likes}
              creatorName={item.fullName}
              userId={item.userId}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full text-[var(--color-primary)] font-bold md:text-4xl text-2xl capitalize justify-center py-40">
          <p>no data found</p>
        </div>
      )}
    </>
  );
}

export default LeaderBoardProjects;
