import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

// import useUser from "../features/authentication/useUser";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaMessage, FaShareNodes } from "react-icons/fa6";
import {
  FaExternalLinkAlt,
  FaLinkedin,
  FaGithub,
  FaInstagramSquare,
} from "react-icons/fa";
import { copyToClipboard } from "../utils/helperFuncs";
import useProfile from "../features/profile/useProfile";
import ProfileSocialLinks from "./ProfileSocialLinks";
import ButtonProfileEdit from "./ButtonProfileEdit";
import ProfilePicture from "./ProfilePicture";
import Spinner from "./Spinner";
import { useUpdateProfile } from "../features/profile/useUpdateProfile";
import useUser from "../features/authentication/useUser";
import ShareMenu from "./ShareMenu";
import useOutsideClick from "../hooks/useOutsideClick";
import ProjectsLayout from "./ProjectsLayout";
import ButtonBack from "./ButtonBack";
import ModelMessage from "./ModelMessage";
import useSettings from "../features/settings/useSettings";

function ProfilePageUI() {
  const { user, isAuthenticated } = useUser();
  const { id } = user || {};
  const messageModelRef = useRef(null);
  const myElementRef = useRef(null);
  const buttonRef = useRef(null); // Ref for the button
  const [isShareMenuOpen, setShareMenuOpen] = useState(false);
  useOutsideClick(
    myElementRef,
    () => setShareMenuOpen((open) => !open),
    buttonRef
  );
  const { userId: previewId } = useParams();
  const [isEditSession, setIsEditSession] = useState(false);
  const { profileData, isLoading: isLoadingProfile } = useProfile(
    previewId ? previewId : id
  );
  const { settingsData: { settings } = {} } = useSettings(previewId);
  const { allow_messages } = settings || {};
  const [messageWindowOpen, setMessageWindowOpen] = useState(false);

  const {
    profile: {
      userId,
      email,
      created_at,
      fullName,
      LinkedIn,
      portfolio,
      bio,
      avatar,
      Instagram,
      Github,
    } = {},
  } = profileData || {};
  const { register, reset, handleSubmit, setValue } = useForm({
    defaultValues: {
      fullName,
      bio,
      portfolio,
      LinkedIn,
      Instagram,
      Github,
      avatar,
    },
  });
  const [lastValidFullName, setLastValidFullName] = useState(fullName);

  //close the model window when clicked outside of it.
  useOutsideClick(
    messageModelRef,
    () => setMessageWindowOpen((open) => !open),
    buttonRef
  );

  // setting default values to the form
  useEffect(() => {
    setValue("fullName", fullName);
    setValue("bio", bio);
    setValue("portfolio", portfolio);
    setValue("LinkedIn", LinkedIn);
    setValue("Instagram", Instagram);
    setValue("Github", Github);
    setValue("avatar", avatar);
    setLastValidFullName(fullName);
  }, [profileData, setValue]);

  const {
    updateProfile,
    isPending: isUpdatingProfile,
    isSuccess: profileUpdated,
  } = useUpdateProfile();

  if (!isAuthenticated && !previewId)
    return (
      <div className="flex items-center capitalize justify-center pb-28 text-[var(--color-primary)] text-3xl font-medium h-full">
        please register or login to see profile
      </div>
    );

  if (isLoadingProfile) return <Spinner />;

  function onSubmitFunc(data) {
    if (!data.fullName || data.fullName === "") {
      setValue("fullName", lastValidFullName);
      toast.error("fullName can't be less than 6 characters");
      return;
    }
    if (!isEditSession) setIsEditSession(true);
    updateProfile(
      { profileData: data, userId },
      {
        onSuccess() {
          reset(data);
        },
      }
    );
    setIsEditSession(false);
  }

  const profileLink = `https://creativespotlight.netlify.app/profile/${userId}`;
  const isValidPortfolioUrl =
    portfolio?.startsWith("http://") || portfolio?.startsWith("https://");
  const portfolioLink = isValidPortfolioUrl
    ? portfolio
    : `https://${portfolio}`;

  return (
    <div className="w-full h-screen py-16 relative overflow-scroll">
      {isShareMenuOpen && (
        <ShareMenu
          reference={myElementRef}
          styles={`right-24 top-12 bg-[var(--bg-secondary)]`}
          destinationurl={profileLink}
        />
      )}
      {previewId && <ButtonBack />}

      <button
        className="text-3xl top-1 absolute right-8"
        ref={buttonRef}
        onClick={() => setShareMenuOpen((open) => !open)}
      >
        <FaShareNodes className="text-[var(--color-primary)]" />
      </button>

      <form onSubmit={handleSubmit(onSubmitFunc)}>
        <div className="mx-auto shadow-custom-primary rounded-3xl flex justify-start space-y-3 items-center flex-col bg-[var(--bg-secondary)] h-auto md:w-[70%] w-full sm:px-8 px-6 py-16 relative">
          <span
            className="text-lg absolute top-6 left-8 font-semibold cursor-pointer"
            onClick={() => copyToClipboard(userId)}
          >
            Copy UID
          </span>
          {!previewId && isAuthenticated && (
            <ButtonProfileEdit
              dis={isUpdatingProfile}
              isEditSession={isEditSession}
              setIsEditSession={setIsEditSession}
            />
          )}

          {userId !== id && previewId && isAuthenticated && allow_messages && (
            <button
              type="button"
              className={`bg-[var(--bg-light)] rounded-sm text-[var(--color-link)] absolute top-2 right-4 font-semibold flex items-center gap-2 px-4 py-2`}
              onClick={() => setMessageWindowOpen((open) => !open)}
            >
              <FaMessage className="mt-1" />
              Message
            </button>
          )}

          {messageWindowOpen && (
            <ModelMessage
              reference={messageModelRef}
              senderId={id}
              receiverId={userId}
              fullName={fullName}
              close={() => setMessageWindowOpen((open) => !open)}
            />
          )}

          <ProfilePicture
            setValue={setValue}
            avatar={avatar}
            isEditSession={isEditSession}
            register={register}
          />
          {isEditSession ? (
            <input
              type="text"
              className="bg-[var(--bg-secondary)] w-3/4 md:text-5xl text-2xl font-medium border-[1px] p-2 animate-blink text-center"
              {...register("fullName", {
                required: "this field is required",
              })}
            />
          ) : (
            <span className="sm:text-5xl text-3xl font-medium">{fullName}</span>
          )}
          <span className="text-lg font-medium">{email}</span>
          <br />

          <div className="flex space-x-6 items-center justify-center w-full">
            <ProfileSocialLinks
              isEditSession={isEditSession}
              placeholder="enter Linkedin url"
              link={LinkedIn}
              register={register}
              label="LinkedIn"
            >
              <FaLinkedin />
            </ProfileSocialLinks>
            <ProfileSocialLinks
              isEditSession={isEditSession}
              placeholder="enter Github url"
              link={Github}
              register={register}
              label="Github"
            >
              <FaGithub />
            </ProfileSocialLinks>
            <ProfileSocialLinks
              register={register}
              isEditSession={isEditSession}
              placeholder="enter Instagram url"
              link={Instagram}
              label="Instagram"
            >
              <FaInstagramSquare />
            </ProfileSocialLinks>
          </div>

          <br />
          {isEditSession ? (
            <input
              type="text"
              className="md:w-1/3 w-2/4 ml-auto text-lg flex items-center border-[1px] p-2 animate-blink bg-[var(--bg-secondary)]"
              placeholder="enter portfolio url"
              {...register("portfolio")}
            />
          ) : (
            <a
              href={`${portfolioLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-auto text-lg flex items-center`}
            >
              portfolio &nbsp;
              <FaExternalLinkAlt />
            </a>
          )}

          <div className="w-full text-lg flex items-start justify-start flex-col space-y-8 ">
            <div className="space-y-1 mt-8">
              <span className="text-3xl">About</span>
              {isEditSession ? (
                <div>
                  <textarea
                    {...register("bio")}
                    rows={5}
                    cols={100}
                    className="w-full bg-[var(--bg-secondary)] text-base p-2 border-[1px] animate-blink text-center resize-none"
                  />
                </div>
              ) : (
                <p className="md:text-base text-sm ">{bio}</p>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-3xl">Member Since</span>
              <p className="text-base">
                {new Date(created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </form>

      <ProjectsLayout
        renderUserInfo={false}
        isAuthenticated={isAuthenticated}
        userId={previewId ? previewId : id}
        renderOperations={"sort"}
      />
    </div>
  );
}

export default ProfilePageUI;
