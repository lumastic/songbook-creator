import { createMockSong } from "@/test/factories/song.factory";
import { Fieldset, Input, Select } from "lib/fieldset";
import { available_marks } from "~/db/song.db";

export const SongForm: React.FC = () => {
  const song = createMockSong();
  return (
    <form method="post">
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
              {line.markings.map((marking, index) => (
                <Fieldset.Headless
                  namespace={`markings[${index}]`}
                  key={marking.id}
                >
                  <Select name="primary_mark">
                    {available_marks.map((mark) => (
                      <option value={mark} key={mark}>
                        {mark}
                      </option>
                    ))}
                  </Select>
                </Fieldset.Headless>
              ))}
              <Input
                name="lyrics"
                placeholder="Lyrics"
                className="block"
                defaultValue={line.lyrics}
              />
              <Input
                name="notes"
                placeholder="Notes"
                className="block"
                defaultValue={line.notes}
              />
            </Fieldset.Headless>
          ))}
        </Fieldset.Headless>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
