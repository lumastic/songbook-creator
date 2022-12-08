import { createMockSong } from "@/test/factories/song.factory";
import { Form } from "@remix-run/react";
import { MarkingsFieldArray } from "~/components/MarkingsFieldArray";
import { Fieldset, Input } from "~/lib/fieldset";

export const SongForm: React.FC = () => {
  const song = createMockSong();
  return (
    <Form>
      <input
        name="title"
        placeholder="Title"
        className="block"
        defaultValue={song.title}
      />
      <input
        name="artist"
        placeholder="Artist"
        className="block"
        defaultValue={song.attribution}
      />
      {song.stanzas.map((stanza, index) => (
        <Fieldset.Headless namespace={`stanzas[${index}]`} key={stanza.id}>
          {stanza.lines.map((line, index) => (
            <Fieldset.Headless namespace={`lines[${index}]`} key={line.id}>
              <MarkingsFieldArray line={line} />
              <Input
                name="lyrics"
                placeholder="Lyrics"
                className="block w-full font-mono"
                defaultValue={line.lyrics}
              />
              <Input
                name="notes"
                placeholder="Notes"
                className="block w-full"
                defaultValue={line.notes}
              />
            </Fieldset.Headless>
          ))}
        </Fieldset.Headless>
      ))}
      <button type="submit">Submit</button>
    </Form>
  );
};
