import type { ChangeEventHandler } from "react";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: ChangeEventHandler<HTMLInputElement>;
}

export const Search: React.FC<Props> = ({ onSearch, ...props }) => {
  return (
    <div
      className="flex flex-row-reverse items-center rounded-md border border-neutral-400 px-3 py-2 transition-colors focus-within:border-neutral-800"
      data-testid="search"
    >
      <input
        type={"search"}
        className="peer w-full bg-inherit placeholder-neutral-500 outline-none"
        placeholder="Search"
        onChange={onSearch}
        {...props}
      />
      <div className="pr-3 text-neutral-500 transition-colors peer-focus:text-neutral-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width="1em"
          height="1em"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </div>
  );
};
