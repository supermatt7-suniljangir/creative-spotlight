import React, { useState, useEffect, useRef } from "react";
import { FaArrowAltCircleRight, FaShareAltSquare } from "react-icons/fa";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import Button from "./Button";
import { FaMessage } from "react-icons/fa6";
import LikeButton from "./LikeButton";
import ButtonBack from "./ButtonBack";
import { Link, useParams } from "react-router-dom";
import { useProject } from "../features/projects/useProject";
import Spinner from "./Spinner";
import ModelMessage from "./ModelMessage";
import useOutsideClick from "../hooks/useOutsideClick";
import useProfile from "../features/profile/useProfile";
import useUser from "../features/authentication/useUser";
import useSettings from "../features/settings/useSettings";
import ButtonProjectSettings from "./ButtonProjectSettings";
import ShareWindow from "./ShareWindow";

function ProjectUI() {

  const { projectId } = useParams();
  const { user, isAuthenticated } = useUser() || {};
  const { id } = user || {};
  const buttonRef = useRef(null);
const [liked, setLiked] = useState(false);
  const { profileData: { profile: { likedProjects } = {} } = {} } =
    useProfile(id) || {};
  const { project, isLoading } = useProject(projectId);
  const [messageWindowOpen, setMessageWindowOpen] = useState(false);
  const [count, setCount] = useState(0);
  const myElementRef = useRef(null);

  useOutsideClick(
    myElementRef,
    () => setMessageWindowOpen((open) => !open),
    buttonRef
  );

  let {
    avatar,
    category,
    description,
    created_at,
    link,
    likes,
    fullName,
    images,
    summary,
    title,
    userId,
  } = project || {};


  const { settingsData: { settings } = {} } = useSettings(userId);
  const { allow_likes } = settings || {};

  useEffect(() => {
    if (project) {
      images = project.images;
    }
    setCount(likes);
const isLiked = likedProjects?.some((Id) => Id === projectId)
    setLiked(isLiked);
  }, [likes, project, likedProjects, project, setLiked]);


  if (isLoading) return <Spinner />;

  return (
    <div className="h-screen overflow-scroll relative">
      <ButtonBack />
      {userId === id && <ButtonProjectSettings projectId={projectId} />}
      <ShareWindow projectId={projectId} />
      <div className="bg-[var(--bg-quaternary)] md:w-[90%] w-[95%]  mx-auto mt-14 h-auto min-h-[100vh] rounded-3xl pb-24 relative">
        {/* header of the project */}
        <div className="flex space-x-4  p-8 justify-between h-auto w-full items-center text-[var(--color-dark)]">
          <div className="flex items-center space-x-4">
            <Link to={`/profile/${userId}`}>
              <img
                src={`${avatar ? avatar : "/emma.jpg"}`}
                alt="user logo"
                className="w-10 h-10 object-cover rounded-full"
              />
            </Link>
            <div>
              <p className="text-xl font-semibold ">{title}</p>
              <span className="text-lg font-medium">{fullName}</span>
              &nbsp;&nbsp;&nbsp;
              <span className="uppercase font-medium">{category}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {allow_likes && (
              <LikeButton
                userId={id}
                projectId={projectId}
                setLiked={setLiked}
                liked={liked}
                likes={likes}
                setCount={setCount}
              />
            )}
            <a href={link} target="_blank">
              <Button
                styles={`flex items-center gap-2 text-2xl text-[var(--color-primary)]`}
              >
                {" "}
                <LiaExternalLinkAltSolid />
              </Button>
            </a>
          </div>
        </div>
        <div className="relative">
          {images?.length &&
            images.map((image) => (
              <img
                key={image}
                src={image}
                alt="project image loading failed"
                className="w-full h-auto object-cover"
              />
            ))}
        </div>

        <div className="py-20 px-10 flex h-auto items-start justify-center flex-col gap-5 bg-[var(--bg-secondary)] relative">
          <p className="text-lg">{summary}</p>
          <p className="text-base">{description}</p>
        </div>

        <div className="p-8 flex h-80 items-center justify-center text-[var(--color-dark)]  flex-col gap-5 bg-[var(--bg-primary)]">
          {allow_likes && (
            <>
              <LikeButton
                userId={id}
                projectId={projectId}
                setLiked={setLiked}
                liked={liked}
                likes={likes}
                setCount={setCount}
                styles={`border-[var(--color-primary)]`}
                iconSize={`text-6xl`}
                iconColor={`[var(--color-primary)]`}
              />
              <span className="font-medium text-lg">
                Appreciated By {count} Eyes
              </span>
            </>
          )}

          <p className="text-md font-normal">
            publised: {new Date(created_at).toDateString()}
          </p>
        </div>

        <div className="relative flex justify-center items-center h-auto p-10 flex-col space-y-8 bg-[var(--bg-secondary)]">
          <div>
            <Link
              className="flex items-center space-y-2 flex-col"
              to={`/profile/${userId}`}
            >
              <img
                src={avatar}
                className="w-20 aspect-square rouinded object-covers rounded-full"
                alt="user profile"
              />
              <h2 className="text-3xl">{fullName}</h2>
            </Link>
          </div>

          {userId !== id && isAuthenticated && (
            <div className="flex space-y-2 items-center flex-col">
              <button
                className={`bg-[var(--bg-quaternary)] text-[var(--color-primary)]  font-medium rounded-sm flex items-center gap-2 px-4 py-1.5 w-fit`}
                ref={buttonRef}
                onClick={() => setMessageWindowOpen((open) => !open)}
              >
                Hire
                <FaMessage className="mt-1" />
              </button>
              <Link to={`/profile/${userId}`}>
                <button
                  className={` flex rounded-sm items-center gap-2 px-4 py-1.5 w-fit`}
                  ref={buttonRef}
                  onClick={() => setMessageWindowOpen((open) => !open)}
                >
                  More by creator <FaArrowAltCircleRight className="mt-1" />
                </button>
              </Link>
            </div>
          )}

          {messageWindowOpen && (
            <ModelMessage
              close={() => setMessageWindowOpen((open) => !open)}
              senderId={id}
              receiverId={userId}
              fullName={fullName}
              reference={myElementRef}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectUI;
