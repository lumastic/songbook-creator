import type { IMarking } from "@/types/song";
import { Popover } from "@headlessui/react";
import React, { useState } from "react";
import { usePopper } from "react-popper";
import type { Mark } from "~/db/song.db";
import { available_marks } from "~/db/song.db";
import { Input } from "~/components/Input";
import { Select } from "../Select";

export const MarkingPopover: React.FC<{
  marking: IMarking;
  moveLeft: () => void;
  moveRight: () => void;
}> = ({ marking, moveLeft, moveRight }) => {
  const [primary, setPrimary] = useState(marking.primary_mark);
  const [secondary, setSecondary] = useState(marking.secondary_mark);
  const [type, setType] = useState(marking.type);

  const updatePrimary = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const value = e.target.value as Mark;
    if (value === "-") {
      setType("repeat");
    } else if (value === "/") {
      setType("measure_break");
    } else {
      setType("chord");
    }
    setPrimary(value);
  };

  const updateSecondary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Mark;
    setSecondary(value);
  };

  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  return (
    <Popover className="inline-block">
      <Popover.Button
        ref={setReferenceElement}
        className="w-[1ch] text-center bg-stone-200 text-stone-800 hover:opacity-60 font-mono outline-none rounded-sm"
      >
        {primary}
      </Popover.Button>
      <Input name="type" value={type} hidden readOnly />
      <Input name="primary_mark" value={primary} hidden readOnly />
      <Input name="secondary_mark" value={secondary} hidden readOnly />
      <Input name="id" value={marking.id} hidden readOnly />
      <Popover.Panel
        className="z-20 max-w-[16rem] w-full"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 px-6 py-4">
          <div className="flex mb-4 items-center">
            <div>
              <button onClick={moveLeft} type="button">
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
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 text-center text-xs uppercase font-bold text-stone-500">
              Position
            </div>
            <div>
              <button onClick={moveRight} type="button">
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Select
              defaultValue={primary}
              name="primary_mark"
              className="bg-stone-200 p-2 rounded-md"
              options={mark_options}
              onChange={updatePrimary}
            />

            <div hidden={type !== "chord"}>
              <div className="flex flex-col">
                <label className="text-xs uppercase text-stone-500 mb-2">
                  Secondary Chord
                </label>
                <Select
                  defaultValue={secondary}
                  name="secondary_mark"
                  className="bg-stone-200 p-2 rounded-md"
                  options={mark_options}
                  onChange={updateSecondary}
                />
              </div>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

const mark_options = available_marks.map((mark) => ({
  name: `${mark} ${
    mark === "-" ? "Repeat" : mark === "/" ? "Measure Break" : "Chord"
  }`,
  value: mark,
}));
