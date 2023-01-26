import { createMockStanza } from "@/test/factories/song.factory";
import type { IStanza } from "@/types/song";
import type { Song } from "@prisma/client";
import { Form } from "@remix-run/react";
import { forwardRef } from "react";
import { Input } from "~/components/Input";
import { Textarea } from "~/components/Textarea";
import { Fieldset } from "~/lib/fieldset";
import { useArray } from "~/lib/useArray";
import { StanzaFields } from "./StanzaFields";

const SongForm = forwardRef<
  HTMLFormElement,
  { song: Song; form?: typeof Form }
>(({ song, form }, ref) => {
  const {
    items: stanzas,
    insert,
    remove,
  } = useArray(JSON.parse(song.stanzas) as IStanza[]);

  const FormComponent = form || Form;

  const insertItem = (index: number) => {
    return () => {
      insert(index + 1, createMockStanza({}));
    };
  };

  const deleteStanza = (index: number) => {
    return () => {
      remove(index);
    };
  };
  return (
    <FormComponent method="post" ref={ref} autoComplete="off">
      <Textarea
        name="title"
        defaultValue={song.title}
        className="text-4xl w-full bg-inherit py-1 outline-none hover:cursor-text resize-none"
        placeholder="Title"
      />
      <Textarea
        name="attribution"
        placeholder="Attribution"
        defaultValue={song.attribution}
        className="text-xl w-full bg-inherit py-1 outline-none hover:cursor-text resize-none"
      />
      <Input name="id" hidden readOnly defaultValue={song.id} />
      <div>
        {stanzas.map((stanza, index) => (
          <div key={stanza.id} className="space-y-1">
            <Fieldset.Headless namespace={`stanzas[${index}]`}>
              <StanzaFields
                stanza={stanza}
                insertStanza={insertItem(index)}
                deleteStanza={deleteStanza(index)}
              />
            </Fieldset.Headless>
          </div>
        ))}
      </div>
      <label>
        <h2>Additional Information</h2>
        <label>
          Runtime in seconds
          <Input
            name="runtime"
            defaultValue={song.runtime}
            type="number"
            title="RunTime (seconds)"
            aria-label="RunTime in seconds"
            className="text-xl w-full bg-inherit py-1 outline-none hover:cursor-text resize-none"
          />
        </label>
        <Textarea
          name="notes"
          placeholder="Notes"
          defaultValue={song.notes}
          className="text-xl w-full bg-inherit py-1 outline-none hover:cursor-text resize-none"
        />
      </label>
      {/* <button
          type="submit"
          className="bg-stone-200 px-5 py-2 rounded-md text-stone-800 mt-4"
        >
          Save
        </button> */}
    </FormComponent>
  );
});

SongForm.displayName = "SongForm";

export { SongForm };
