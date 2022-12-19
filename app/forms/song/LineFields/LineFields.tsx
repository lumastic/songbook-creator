import { createMockBreakMark } from "@/test/factories/song.factory";
import type { ILine } from "@/types/song";
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

  let [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(
    null
  );
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
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
        <div
          className="opacity-0 h-full transition-opacity group-hover:opacity-100 z-10 flex items-center pr-5"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <button
            type="button"
            className="bg-stone-200 h-full rounded-sm text-stone-600 text-sm px-0.5"
            onClick={confirmAndDelete}
          >
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
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
        />
        <Input
          name="notes"
          placeholder="Stylistic notes"
          className="opacity-75 text-sm"
          defaultValue={line.notes}
        />
      </div>
    </div>
  );
};
