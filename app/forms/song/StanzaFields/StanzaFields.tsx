import { createMockStanza } from "@/test/factories/song.factory";
import type { IStanza } from "@/types/song";
import { Fieldset } from "~/lib/fieldset";
import { Input } from "~/components/Input";
import { useArray } from "~/lib/useArray";
import { LineFields } from "../LineFields";
import { Select } from "~/components/Select";

export const StanzaFields: React.FC<{
  stanza: IStanza;
  insertStanza?: () => void;
  deleteStanza?: () => void;
}> = ({ stanza, insertStanza, deleteStanza }) => {
  const { items: lines, insert, remove } = useArray(stanza.lines);

  const insertLine = (index: number) => {
    return () => {
      insert(index + 1, createMockStanza({}).lines[0]);
    };
  };

  const deleteLine = (index: number) => {
    return () => {
      remove(index);
    };
  };

  const confirmAndDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this stanza?\nYou can't undo this action."
      )
    ) {
      if (deleteStanza) deleteStanza();
    }
  };

  return (
    <>
      <div className="group/stanza py-2 border-y-2 focus-within:border-stone-200 hover:border-stone-200 border-transparent transition-all">
        <div className="flex">
          <div className="flex-1">
            <Select
              options={[
                { name: "Verse", value: "verse" },
                { name: "Chorus", value: "chorus" },
                { name: "Bridge", value: "bridge" },
              ]}
              name="type"
              className="font-bold uppercase w-auto"
              defaultValue={stanza.type}
            />
          </div>
          <div>
            <button
              type="button"
              className="hover:bg-stone-200 rounded-sm text-stone-600 text-sm p-2 group-hover/stanza:opacity-100 opacity-0 transition-colors whitespace-nowrap inline-flex items-center"
              onClick={confirmAndDelete}
            >
              <span className="mr-1">
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
              </span>
              <span className="uppercase text-xs">Delete</span>
            </button>
          </div>
        </div>
        <Input name="id" hidden readOnly defaultValue={stanza.id} />
        {lines.map((line, index) => (
          <div key={line.id}>
            <Fieldset.Headless namespace={`lines[${index}]`}>
              <LineFields
                line={line}
                deleteLine={deleteLine(index)}
                insertLine={insertLine(index)}
              />
            </Fieldset.Headless>
            <button
              type="button"
              aria-label="Add Line"
              onClick={insertLine(index)}
              className="block bg-stone-200 text-stone-600 opacity-0 hover:opacity-100 transition-all w-full rounded-sm py-1 h-2 hover:h-6 font-mono text-sm leading-none"
            >
              + Add Line
            </button>
          </div>
        ))}
        {lines.length < 1 && (
          <button
            type="button"
            aria-label="Add Line"
            onClick={insertLine(0)}
            className="block bg-stone-200 text-stone-600 opacity-0 hover:opacity-100 transition-all w-full rounded-sm py-1 h-2 hover:h-6 font-mono text-sm leading-none"
          >
            + Add Line
          </button>
        )}
      </div>
      <button
        type="button"
        aria-label="Add Line"
        onClick={insertStanza}
        className="block bg-stone-200 text-stone-600 opacity-0 hover:opacity-100 transition-all w-full rounded-sm py-1 h-2 hover:h-6 font-mono text-sm leading-none"
      >
        + New Stanza
      </button>
    </>
  );
};
