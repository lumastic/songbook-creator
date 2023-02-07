import type { ILine, IMarking } from "@/types/song";
import { Menu } from "@headlessui/react";
import type { ClipboardEvent, KeyboardEvent } from "react";
import { useState } from "react";
import { usePopper } from "react-popper";
import { Input } from "~/components/Input";
import { MarkingInput } from "~/components/MarkingInput";
import { Fieldset, useNamespace } from "~/lib/fieldset";
import { useArray } from "~/lib/useArray";
import { useFocus } from "~/lib/useFocus";
import uniqid from "uniqid";

type Props = {
  line: ILine;
  insertLine?: (lyric?: string) => void;
  deleteLine?: () => void;
};

export const LineFields: React.FC<Props> = ({
  line,
  insertLine,
  deleteLine,
}) => {
  const {
    items: markingsFieldArray,
    push,
    remove,
  } = useArray(line.markings || []);
  const markingButtonArray = new Array(
    Math.max(line.lyrics.length + 1, 50)
  ).fill(true);

  const namespace = useNamespace("");
  const focus = useFocus();

  const [showNotes, setShowNotes] = useState(line.notes.length > 1);

  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "left",
  });

  function insertMark(index: number) {
    return () => {
      const length = markingsFieldArray.length;
      push({ indent: index, id: uniqid(), mark: "" } as IMarking);
      focus(`input[name="${namespace}markings[${length}].mark"]`);
    };
  }

  function removeMark(index: number) {
    return () => {
      remove(index);
    };
  }

  function newLineOnEnterKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      // Get text after the current cursor position
      const afterCursorText = target.value.slice(
        target.selectionStart ?? undefined
      );
      // Remove the text after the cursor from current lyrics input
      target.value = target.value.slice(0, target.selectionStart ?? undefined);
      // Insert line with text after the cursor
      if (insertLine) insertLine(afterCursorText);
    }
  }

  function onPasteLyrics(e: ClipboardEvent<HTMLInputElement>) {
    // Trigger handlePaste from StanzaContext
  }

  function confirmAndDelete() {
    if (
      confirm(
        "Are you sure you want to delete this line?\nYou can't undo this action."
      )
    ) {
      if (deleteLine) deleteLine();
    }
  }

  return (
    <div className="w-full whitespace-nowrap" data-testid="line-fields">
      <Input name="id" hidden readOnly defaultValue={line.id} />
      <div className="group relative" ref={setReferenceElement}>
        <Menu>
          <div
            className="z-20 flex h-full items-center pr-5 opacity-0 transition-opacity group-hover:opacity-100"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <Menu.Button className="h-full rounded-sm bg-neutral-200 px-0.5 text-sm text-neutral-600">
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
          <Menu.Items className="divide-gray-100 absolute z-10 w-28 origin-top-left -translate-x-9 divide-y rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active ? "bg-neutral-200" : "text-neutral-900"
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
        <div className="relative">
          {markingsFieldArray.map((marking, index) => {
            return (
              <Fieldset.Headless
                namespace={`markings[${index}]`}
                key={marking?.id || index}
              >
                <MarkingInput
                  marking={marking}
                  deleteMark={removeMark(index)}
                />
              </Fieldset.Headless>
            );
          })}
          <div>
            {markingButtonArray.map((_, index) => (
              <button
                key={index}
                onClick={insertMark(index)}
                className="rounded-sm bg-neutral-200 font-mono text-neutral-500 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 active:opacity-60"
              >
                +
              </button>
            ))}
          </div>
        </div>
        <Input
          name="lyrics"
          placeholder="Lyrics"
          className="font-mono"
          defaultValue={line.lyrics}
          onKeyDown={newLineOnEnterKey}
          onPaste={onPasteLyrics}
        />
        <Input
          name="notes"
          placeholder="Stylistic notes"
          className="text-sm opacity-75"
          hidden={!showNotes}
          defaultValue={line.notes}
          onKeyDown={newLineOnEnterKey}
        />
      </div>
    </div>
  );
};
