import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Header from "./Header";

// lets customize this comment first
function AppLayout() {
  const [navOpen, setNavOpen] = useState(false);
 
  return (
    <div className="text-[var(--color-light)] ">
      <header>
        <Navigation isOpen={navOpen} setIsOpen={setNavOpen} />
        <Header
          styles={`${navOpen ? "md:w-[87%]" : "md:w-[95%]"} ml-auto px-4 py-4`}
        />
      </header>

      <main
        className={`md:pb-0 pb-20 ${
          navOpen ? "md:w-[87%]" : "md:w-[95%]"
        } ml-auto px-4 py-4 h-screen `}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
