import React from "react";
import { IoLogOut } from "react-icons/io5";

import { IoIosLogOut, IoMdMail, IoIosSearch } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Logo from "./Logo";
import { twMerge } from "tailwind-merge";
import useUser from "../features/authentication/useUser";
import { useLogout } from "../features/authentication/useLogout";
import Button from "./Button";
import useProfile from "../features/profile/useProfile";
function Header({ styles }) {
  const { userId: previewId } = useParams();
  const { logout, isLoading: isLogingOut } = useLogout();
  const { isLoading: isLoadingUser, user, isAuthenticated } = useUser();
  const { id } = user || {};
  const { profileData, isLoading: isLoadingProfile } = useProfile(id);

  const { profile: { fullName, avatar } = {} } = profileData || {};

  if (previewId) return null;

  return (
    <div
      className={twMerge(
        "bg-[var(--bg-quaternary)] text-[var(--color-primary)] font-medium h-16 flex justify-end md:px-8 px-0 items-center space-x-6 w-full",
        styles
      )}
    >
      <Logo align="left" />
      {isAuthenticated ? (
        <>
          <div className=" w-auto px-4 py-1 capitalize rounded-md ">
            <Link to={`/search`} className="">
              <IoIosSearch className="text-3xl" />
            </Link>
          </div>
          <Link to="profile">
            <div className="flex space-x-2 cursor-pointer text-lg">
              <img
                src={avatar || "/man.png"}
                alt="user picture"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="sm:inline hidden">{fullName}</span>
            </div>
          </Link>
          <Link to={`inbox`}>
            <IoMdMail className="w-6 h-6" />
          </Link>
          <Button onClick={logout} disabled={isLogingOut}>
            <IoLogOut className="text-[var(--color-primary)] font-bold text-2xl mt-1" />
          </Button>
        </>
      ) : (
        <div className="flex space-x-3">
          <div className=" w-auto  px-4 py-1 capitalize rounded-md ">
            <Link to={`/search`} className="">
              <IoIosSearch className="text-3xl" />
            </Link>
          </div>
          <Link to="signup">
            {" "}
            <Button styles={`bg-[var(--bg-secondary)] px-3 pb-2 pt-1 `}>
              sign up
            </Button>
          </Link>
          <Link to="login">
            {" "}
            <Button styles={`bg-[var(--bg-secondary)] px-3 pb-2 pt-1 `}>
              login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
