import { Link, NavLink } from "@remix-run/react";
import React from "react";

type Props = {};

export const NavBar: React.FC<Props> = () => {
  return (
    <nav className="bg-stone-300 py-4 px-2" data-testid="navbar">
      <div className="flex container max-w-xl mx-auto">
        <div className="flex-1">PubJam</div>
        <div className="space-x-6">
          <NavLink
            to={"/song"}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};
