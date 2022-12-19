import { createMockStanza } from "@/test/factories/song.factory";
import type { ISong } from "@/types/song";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { Input } from "~/components/Input";
import { Fieldset } from "~/lib/fieldset";
import { useArray } from "~/lib/useArray";
import { StanzaFields } from "./StanzaFields";

export const SongForm: React.FC<{ song: ISong }> = ({ song }) => {
  const { items: stanzas, insert, remove } = useArray(song.stanzas);
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.attribution);

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

  const onTitleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setTitle(e.target.innerText);
  };

  const onArtistChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setArtist(e.target.innerText);
  };
  return (
    <Form method="post">
      <div
        contentEditable
        suppressContentEditableWarning
        className="text-4xl w-full bg-inherit py-1 empty:before:text-stone-500 outline-none hover:cursor-text"
        onInput={onTitleChange}
        dangerouslySetInnerHTML={{ __html: song.title }}
        data-placeholder="Title"
      ></div>
      <Input name="title" hidden value={title} readOnly />
      <div
        contentEditable
        suppressContentEditableWarning
        className="text-xl w-full bg-inherit py-1 empty:before:text-stone-500 outline-none hover:cursor-text"
        onInput={onArtistChange}
        data-placeholder="Attribution"
        dangerouslySetInnerHTML={{ __html: song.attribution }}
      ></div>
      <Input name="artist" hidden value={artist} readOnly />
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
      {/* <button
        type="submit"
        className="bg-stone-200 px-5 py-2 rounded-md text-stone-800 mt-4"
      >
        Save
      </button> */}
    </Form>
  );
};
