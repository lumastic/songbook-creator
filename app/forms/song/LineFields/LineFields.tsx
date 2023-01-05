import { createMockBreakMark } from "@/test/factories/song.factory";
import type { ILine } from "@/types/song";
import { Menu } from "@headlessui/react";
import type { KeyboardEvent } from "react";
import { useState } from "react";
import { usePopper } from "react-popper";
import { Input } from "~/components/Input";
import { lineToMarkFieldArrayItems } from "~/helpers/lineToMarkFieldArrayItems";
import { Fieldset } from "~/lib/fieldset";
import { useArray } from "~/lib/useArray";
import { MarkingPopover } from "../../../components/MarkingPopover/MarkingPopover";

type Props = {
  line: ILine;
  insertLine?: () => void;
  deleteLine?: () => void;
};

export const LineFields: React.FC<Props> = ({
  line,
  insertLine,
  deleteLine,
}) => {
  const {
    items: markingsFieldArray,
    replace,
    push,
    swap,
  } = useArray(lineToMarkFieldArrayItems(line));

  const [showNotes, setShowNotes] = useState(line.notes.length > 1);

  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "left",
  });

  const insertItem = (index: number) => {
    return () => {
      replace(index, createMockBreakMark({}));
      push(undefined);
    };
  };

  const moveLeft = (index: number) => {
    return () => {
      if (index > 0) swap(index, index - 1);
    };
  };

  const moveRight = (index: number) => {
    return () => {
      if (index < markingsFieldArray.length - 1) swap(index, index + 1);
    };
  };

  const newLineOnEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (insertLine) insertLine();
    }
  };

  const confirmAndDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this line?\nYou can't undo this action."
      )
    ) {
      if (deleteLine) deleteLine();
    }
  };

  return (
    <div className="w-full whitespace-nowrap" data-testid="line-fields">
      <Input name="id" hidden readOnly defaultValue={line.id} />

      <div className="group relative" ref={setReferenceElement}>
        <Menu>
          <div
            className="opacity-0 h-full transition-opacity group-hover:opacity-100 z-10 flex items-center pr-5"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <Menu.Button className="bg-stone-200 h-full rounded-sm text-stone-600 text-sm px-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width={"1em"}
                height={"1em"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </Menu.Button>
          </div>
          <Menu.Items className="absolute -translate-x-9 w-28 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 sm:text-sm">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active ? "bg-stone-200" : "text-stone-900"
                  } group flex w-full items-center rounded-md px-4 py-3`}
                  onClick={() => setShowNotes((x) => !x)}
                >
                  {!showNotes ? "Add notes" : "Hide notes"}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active ? "bg-red-200 text-red-900" : "text-red-900"
                  } group flex w-full items-center rounded-md px-4 py-3`}
                  onClick={confirmAndDelete}
                >
                  Delete line
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>

        {markingsFieldArray.map((marking, index) => {
          const formIndex = markingsFieldArray
            .filter(Boolean)
            .findIndex((mark) => mark?.id === marking?.id);
          return (
            <Fieldset.Headless
              namespace={`markings[${formIndex}]`}
              key={marking?.id || index}
            >
              {marking ? (
                <>
                  <MarkingPopover
                    marking={marking}
                    moveLeft={moveLeft(index)}
                    moveRight={moveRight(index)}
                  />
                  <Input name="indent" value={index} hidden readOnly />
                </>
              ) : (
                <button
                  onClick={insertItem(index)}
                  className="bg-stone-200 text-stone-500 opacity-0 transition-opacity active:opacity-60 hover:opacity-100 focus:opacity-100 font-mono rounded-sm"
                >
                  +
                </button>
              )}
            </Fieldset.Headless>
          );
        })}
        <Input
          name="lyrics"
          placeholder="Lyrics"
          className="font-mono"
          defaultValue={line.lyrics}
          onKeyDown={newLineOnEnterKey}
        />
        <Input
          name="notes"
          placeholder="Stylistic notes"
          className="opacity-75 text-sm"
          hidden={!showNotes}
          defaultValue={line.notes}
        />
      </div>
    </div>
  );
};
