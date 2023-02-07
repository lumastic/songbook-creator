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
    return (lyrics?: string) => {
      const lineToInsert = createMockStanza({}).lines[0];
      lineToInsert.lyrics = lyrics || "";
      insert(index + 1, lineToInsert);
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
      <div className="group/stanza border-y-2 border-transparent py-2 transition-all focus-within:border-neutral-200 hover:border-neutral-200">
        <div className="flex">
          <div className="flex-1">
            <Select
              options={[
                { name: "Verse", value: "verse" },
                { name: "Chorus", value: "chorus" },
                { name: "Bridge", value: "bridge" },
              ]}
              name="type"
              className="w-auto font-bold uppercase"
              defaultValue={stanza.type}
            />
          </div>
          <div>
            <button
              type="button"
              className="inline-flex items-center whitespace-nowrap rounded-sm p-2 text-sm text-neutral-600 opacity-0 transition-colors hover:bg-neutral-200 group-hover/stanza:opacity-100"
              onClick={confirmAndDelete}
            >
              <span className="mr-1">
                <TrashIcon width={"1em"} />
              </span>
              <span className="text-xs uppercase">Delete</span>
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
              onClick={() => insertLine(index)()}
              className="block h-2 w-full rounded-sm bg-neutral-200 py-1 font-mono text-sm leading-none text-neutral-600 opacity-0 transition-all hover:h-6 hover:opacity-100"
            >
              + Add Line
            </button>
          </div>
        ))}
        {lines.length < 1 && (
          <button
            type="button"
            aria-label="Add Line"
            onClick={() => insertLine(0)()}
            className="block h-2 w-full rounded-sm bg-neutral-200 py-1 font-mono text-sm leading-none text-neutral-600 opacity-0 transition-all hover:h-6 hover:opacity-100"
          >
            + Add Line
          </button>
        )}
      </div>
      <button
        type="button"
        aria-label="Add Line"
        onClick={insertStanza}
        className="block h-2 w-full rounded-sm bg-neutral-200 py-1 font-mono text-sm leading-none text-neutral-600 opacity-0 transition-all hover:h-6 hover:opacity-100"
      >
        + New Stanza
      </button>
    </>
  );
};
