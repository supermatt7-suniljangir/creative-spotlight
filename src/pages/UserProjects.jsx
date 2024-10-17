import React from "react";
import { Link, NavLink, useParams, useSearchParams } from "react-router-dom";
import ProjectsLayout from "../UI/ProjectsLayout";
import { useLeaderBoardProjects } from "../features/projects/useLeaderboardProjects";
import Spinner from "../UI/Spinner";
import useUser from "../features/authentication/useUser";
import Button from "../UI/Button";
import ButtonAddNewProject from "../UI/ButtonAddNewProject";
import BtnTabs from "../UI/BtnTabs";

function UserProjects() {
  const { isAuthenticated, user } = useUser();

  if (!isAuthenticated)
    return (
      <div className="flex items-center capitalize justify-center pb-28 text-[var(--color-primary)] text-3xl font-medium h-full">
        please register or login to see your projects
      </div>
    );

  return (
    <div className="h-full overflow-scroll relative pb-8">
      <ButtonAddNewProject />
      <div className="flex md:mt-4 mt-16 items-center justify-center">
        <BtnTabs label={"Projects"} path={`/projects/type/user`} />
        <BtnTabs
          label={"Appreciations"}
          path={`/projects/type/appreciations`}
        />
      </div>

      <ProjectsLayout userId={user?.id} isAuthenticated={isAuthenticated} renderOperations="sort" />
    </div>
  );
}

export default UserProjects;
