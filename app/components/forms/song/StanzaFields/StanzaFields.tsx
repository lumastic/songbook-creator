import { createMockStanza } from "@/test/factories/song.factory";
import type { IStanza } from "@/types/song";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Input } from "~/components/Input";
import { Select } from "~/components/Select";
import { Fieldset, useNamespace } from "~/lib/fieldset";
import { useArray } from "~/lib/useArray";
import { useFocus } from "~/lib/useFocus";
import { LineFields } from "../LineFields";

export const StanzaFields: React.FC<{
  stanza: IStanza;
  insertStanza?: () => void;
  deleteStanza?: () => void;
}> = ({ stanza, insertStanza, deleteStanza }) => {
  const { items: lines, insert, remove } = useArray(stanza.lines);

  const focus = useFocus();
  const namespace = useNamespace("");

  const insertLine = (index: number) => {
    return () => {
      insert(index + 1, createMockStanza({}).lines[0]);
      focus(`input[name="${namespace}lines[${index + 1}].lyrics"]`);
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
                <TrashIcon width={"1em"} />
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
