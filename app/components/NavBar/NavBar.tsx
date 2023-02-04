import { NavLink } from "@remix-run/react";
import React from "react";
import { LogoutButton } from "../forms/logout";

type Props = {};

export const NavBar: React.FC<Props> = () => {
  return (
    <nav className="bg-neutral-200 py-4 px-2" data-testid="navbar">
      <div className="flex container max-w-xl mx-auto bg-neutral-50 px-4 py-3 rounded-2xl items-center shadow-md">
        <div className="flex-1">
          <div className="flex items-center">
            <div>
              <img
                src="/tune_binder_logo.svg"
                alt="TuneBunder Logo"
                className="object-contain w-7"
              />
            </div>
            {/* <div className="flex-1">TuneBinder</div> */}
          </div>
        </div>
        <div className="space-x-6">
          <NavLink
            to={"/songs"}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-primary-600 border-primary-500 font-medium"
                  : "text-neutral-500 hover:opacity-80 hover:text-primary-600"
              } uppercase text-sm transition-all border-b-2 border-transparent`
            }
          >
            Songs
          </NavLink>
          <NavLink
            to={"/setlists"}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-primary-600 border-primary-500 font-medium"
                  : "text-neutral-500 hover:opacity-80 hover:text-primary-600"
              } uppercase text-sm transition-all border-b-2 border-transparent`
            }
          >
            Setlists
          </NavLink>
        </div>
        <div className="flex-1 flex justify-end">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};
