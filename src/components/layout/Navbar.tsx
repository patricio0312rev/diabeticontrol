import React from "react";
import Logout from "@/app/assets/svgs/logout.svg";
import Tippy from "@tippyjs/react";
import { Logo } from "./Logo";

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 bg-transparent hover:bg-white/80 transition-colors duration-300 shadow-none hover:shadow-lg z-10 group">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Empty to push the logo to the middle */}
          <div className="flex-shrink-0" />

          <div className="flex items-center justify-center flex-grow">
            <Logo />
          </div>

          <div className="flex items-center space-x-4">
            <Tippy content="Cerrar sesión">
              <button className="text-white group-hover:text-theme-secondary-600 group-hover:hover:text-theme-primary-600 transition-colors duration-200">
                <Logout className="h-6 w-6" />
              </button>
            </Tippy>
          </div>
        </div>
      </div>
    </nav>
  );
};
