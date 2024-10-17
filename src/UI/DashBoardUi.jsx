import React from "react";
import ButtonAddNewProject from "./ButtonAddNewProject";
import useUser from "../features/authentication/useUser";
import useProfile from "../features/profile/useProfile";
import { Link } from "react-router-dom";
import { TbEyeShare } from "react-icons/tb";
import { BiSolidLike } from "react-icons/bi";
import { IoMdHeart, IoMdMailUnread } from "react-icons/io";
import { useProjects } from "../features/projects/useProjects";
import { FaUserCircle } from "react-icons/fa";
import { VscProject } from "react-icons/vsc";
import { MdLeaderboard } from "react-icons/md";
import Spinner from "./Spinner";

function DashBoardUi() {
  const { isLoading: isLoadingUser, user } = useUser();
  const { id } = user || {};
  const { profileData, isLoading: isLoadingProfile } = id ? useProfile(id) : {};
  const { profile: { fullName, avatar } = {} } = profileData || {};
  const { isLoading: isLoadingProjects, userProjects } = id
    ? useProjects(id)
    : {};

  const appreciationCount = profileData?.profile?.likedProjects?.length;
  const projectsCount = userProjects?.length;
  const likesCount = userProjects?.reduce((acc, cur) => acc + cur.likes, 0);

  if (isLoadingUser || isLoadingProfile || isLoadingProjects)return <Spinner />;
  return (
    <div className="relative h-full w-full overflow-x-hidden overflow-y-auto py-8">
      <h2 className="text-center text-[var(--color-primary)] font-bold text-xl sm:text-2xl md:text-3xl">
        Dashboard
      </h2>
      <div className="relative md:-mt-8 pt-4 w-full text-[var(--color-primary)] flex md:flex-row md:oveflow-x-hidden flex-col justify-around">
        <ButtonAddNewProject />

        <div className="md:w-60 w-2/4 md:mt-unset mt-16 h-fit md:max-w-[25%] flex relative items-center mx-auto md:max-unset justify-center shadow-custom-primary rounded-md p-6 aspect-square bg-[var(--bg-secondary)] text-[var(--color-light)]">
          <Link className="absolute right-1 top-1" to={`/profile`}>
            <TbEyeShare className=" text-2xl cursor-pointer" />
          </Link>
          <div className="text-xl font-medium overflow-hidden text-center">
            <img
              src={avatar}
              alt={fullName}
              className="w-full object-cover aspect-square rounded-md mb-1"
            />
            <h2>{fullName}</h2>
          </div>
        </div>

        <div className="md:w-3/4 w-full flex-wrap relative justify-center items-center sm:flex-row flex-col  h-fit rounded-md gap-8 shadow-2xl md:mt-20 mt-8 flex py-14 bg-[var(--bg-secondary)]">
          {/* total likes box */}
          <div className="shadow-2xl relative bg-[var(--bg-quaternary)] sm:w-1/4 w-2/3 box-content p-4 aspect-video rounded-md">
            <div className="absolute right-3 top-2 md:text-5xl text-3xl  p-2 rounded-full">
              <IoMdHeart />
            </div>

            <div className="flex flex-col gap-2 box-border px-4 items-start h-full justify-center">
              <span className="md:text-5xl text-3xl font-bold">{likesCount}</span>
              <span className="font-semibold text-xl capitalize">
                total likes
              </span>
            </div>
          </div>

          {/* total projects count box*/}
          <div className="bg-[var(--bg-quaternary)] shadow-2xl  relative sm:w-1/4 w-2/3 box-content p-4 aspect-video rounded-md">
            <div className="absolute  right-4 top-2 text-4xl  p-2 rounded-full">
              <VscProject />
            </div>
            <div className="flex flex-col gap-2 box-border  px-4 items-start h-full justify-center">
              <span className="text-5xl font-bold">{projectsCount}</span>
              <span className="font-semibold text-xl capitalize">
                total projects
              </span>
            </div>
          </div>

          {/* total appreciation count*/}
          <div className="bg-[var(--bg-quaternary)] shadow-2xl  relative sm:w-1/4 w-2/3 box-content p-4 aspect-video rounded-md">
            <div className="absolute right-3 top-2 text-5xl  p-2 rounded-full">
              <BiSolidLike />
            </div>
            <div className="flex flex-col gap-2 box-border px-4 items-start h-full justify-center">
              <span className="text-5xl font-bold">{appreciationCount}</span>
              <span className="font-semibold text-xl capitalize">
                total appreciations
              </span>
            </div>
          </div>

          {/* remaining link boxes */}

          <div className="w-auto md:block hidden  h-auto bg-[var(--bg-quaternary)] p-6 text-[var(--color-primary)]  shadow-dark rounded-md ">
            <Link
              to={`/inbox`}
              className="flex items-center justify-center w-full h-full gap-2 text-3xl"
            >
              <IoMdMailUnread />
            </Link>
          </div>

          <div className="w-auto h-auto md:block hidden bg-[var(--bg-quaternary)] p-6 text-[var(--color-primary)]  shadow-dark rounded-md ">
            <Link
              to={`/profile`}
              className="flex items-center justify-center w-full h-full gap-2 text-3xl"
            >
              <FaUserCircle />
            </Link>
          </div>
          <div className="w-auto md:block hidden h-auto bg-[var(--bg-quaternary)] p-6 text-[var(--color-primary)]  shadow-dark rounded-md ">
            <Link
              to={`/projects`}
              className="flex items-center justify-center w-full h-full gap-2 text-3xl"
            >
              <VscProject />
            </Link>
          </div>
          <div className="w-auto md:block hidden h-auto bg-[var(--bg-quaternary)] p-6 text-[var(--color-primary)]  shadow-dark rounded-md ">
            <Link
              to={`/leaderboard`}
              className="flex items-center justify-center w-full h-full gap-2 text-3xl"
            >
              <MdLeaderboard />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardUi;
