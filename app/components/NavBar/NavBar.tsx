import { NavLink } from "@remix-run/react";
import React from "react";
import { LogoutButton } from "~/forms/logout";

type Props = {};

export const NavBar: React.FC<Props> = () => {
  return (
    <nav className="bg-stone-300 py-4 px-2" data-testid="navbar">
      <div className="flex container max-w-xl mx-auto">
        <div className="flex-1">PubJam</div>
        <div className="space-x-6">
          <NavLink
            to={"/songs"}
            className={({ isActive }) => `${isActive && "underline font-bold"}`}
          >
            Songs
          </NavLink>
          <NavLink
            to={"/setlists"}
            className={({ isActive }) => `${isActive && "underline font-bold"}`}
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
