import { Listbox } from "@headlessui/react";
import type { InputHTMLAttributes} from "react";
import { useEffect } from "react";
import React, { useState } from "react";
import { Input } from "../Input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: { name: string; value: string }[];
}

export function Select({
  name,
  options,
  defaultValue,
  className,
  onChange,
  ...props
}: Props) {
  const [selected, setSelected] = useState(options[0]);

  function handleChange(value: typeof options[0]) {
    setSelected(value);
    if (onChange)
      onChange({
        target: {
          value: value.value,
        },
      } as React.ChangeEvent<HTMLInputElement>);
  }

  return (
    <div className="w-full">
      <Input
        hidden
        readOnly
        name={name}
        value={selected.value}
        data-testid="select"
        {...props}
      />
      <Listbox
        defaultValue={
          options.find((option) => option.value === defaultValue) || options[0]
        }
        onChange={handleChange}
      >
        <div className="relative">
          <Listbox.Button
            className={[
              "relative w-full cursor-default rounded-sm bg-inherit py-2 pr-10 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-300 sm:text-sm",
              className,
            ].join(" ")}
          >
            {({ value }) => (
              <>
                <span className={"block truncate"}>{value.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-sm">
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
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </>
            )}
          </Listbox.Button>
          <Listbox.Options className="absolute z-30 bg-inherit mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-full">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-stone-100 text-stone-900" : "text-gray-900"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-600 text-sm">
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
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
