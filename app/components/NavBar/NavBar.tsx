import { NavLink } from "@remix-run/react";
import React from "react";
import { LogoutButton } from "../forms/logout";

type Props = {};

export const NavBar: React.FC<Props> = () => {
  return (
    <nav className="bg-neutral-200 py-4 px-2" data-testid="navbar">
      <div className="container mx-auto flex max-w-xl items-center rounded-2xl bg-neutral-50 px-4 py-3 shadow-md">
        <div className="flex-1">
          <div className="flex items-center">
            <div>
              <img
                src="/tune_binder_logo.svg"
                alt="TuneBunder Logo"
                className="w-7 object-contain"
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
                  ? " border-primary-500 font-medium text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-primary-600 hover:opacity-80"
              } border-b-2  text-sm uppercase transition-all`
            }
          >
            Songs
          </NavLink>
          <NavLink
            to={"/setlists"}
            className={({ isActive }) =>
              `${
                isActive
                  ? " border-primary-500 font-medium text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-primary-600 hover:opacity-80"
              } border-b-2 text-sm uppercase transition-all`
            }
          >
            Setlists
          </NavLink>
        </div>
        <div className="flex flex-1 justify-end">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};
