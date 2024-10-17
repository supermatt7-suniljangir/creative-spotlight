import React, { useState } from "react";
import { FaHome, FaCog } from "react-icons/fa"; // Import icons
import { RxHamburgerMenu } from "react-icons/rx";
import { MdDashboard, MdLeaderboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { AiOutlineProject } from "react-icons/ai";

import NavLinkItem from "../UI/NavLinkItem";
import Button from "./Button";

function Navigation({ isOpen, setIsOpen }) {
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed md:top-0 bottom-0 overflow-hidden left-0 md:h-screen h-auto bg-[var(--bg-quaternary)] text-[var(--color-primary)] font-medium flex md:flex-col items-center  justify-around z-50 transition duration-300 ease-in-out ${
        isOpen ? "md:w-[13%]" : "md:w-[5%]"
      } w-full`}
    >
      <Button
        styles={`focus:outline-1 hidden md:block focus:outline-stone-200 mb-auto mr-2 mt-3 ${
          isOpen ? "mr-auto ml-2" : ""
        } `}
        onClick={toggleMenu}
      >
        <RxHamburgerMenu className="text-4xl text-[var(--color-primary)] " />
      </Button>
      <div className="flex space-y-1 mb-auto md:flex-col flex-row">
        <NavLinkItem text="Dashboard" to="dashboard" isOpen={isOpen}>
          <MdDashboard className="text-2xl" />
        </NavLinkItem>
        <NavLinkItem text="leaderboard" to="leaderboard" isOpen={isOpen}>
          <MdLeaderboard className="text-2xl" />
        </NavLinkItem>
        <NavLinkItem text="projects" to="projects" isOpen={isOpen}>
          <AiOutlineProject className="text-2xl" />
        </NavLinkItem>
        <NavLinkItem text="profile" to="profile" isOpen={isOpen}>
          <CgProfile className="text-2xl" />
        </NavLinkItem>
        <NavLinkItem text="settings" to="settings" isOpen={isOpen}>
          <FaCog className="text-2xl" />
        </NavLinkItem>
      </div>
    </nav>
  );
}

export default Navigation;
