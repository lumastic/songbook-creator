import type { ChangeEventHandler } from "react";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: ChangeEventHandler<HTMLInputElement>;
}

export const Search: React.FC<Props> = ({ onSearch, ...props }) => {
  return (
    <div className="border-stone-400 border rounded-md px-3 py-2 flex items-center focus-within:border-stone-800 flex-row-reverse transition-colors">
      <input
        type={"search"}
        className="peer bg-inherit placeholder-stone-500 w-full outline-none"
        placeholder="Search"
        onChange={onSearch}
        {...props}
      />
      <div className="pr-3 text-stone-500 peer-focus:text-stone-700 transition-colors">
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
