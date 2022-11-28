import { createMockSong } from "@/test/factories/song";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { makeMarkingsIndentsSpaces } from "~/helpers/makeMarkingIndentsSpaces";

export function loader() {
  return json({ song: createMockSong() });
}

export default function Index() {
  const { song } = useLoaderData<typeof loader>();
  return (
    <>
      <div>
        <h1>{song.title}</h1>
        <p>{song.attribution}</p>
      </div>
      <div className="song">
        {song.stanzas.map((stanza, key) => (
          <div className="stanza" key={key}>
            <p>
              <b>{stanza.type?.toUpperCase()}</b>
            </p>
            {stanza.lines.map((line, key) => {
              const spacedMarkings = makeMarkingsIndentsSpaces(line.markings);
              return (
                <div className="line" key={key}>
                  <pre className="markings">
                    {spacedMarkings.map((marking, key) => (
                      <span className="marking" key={key}>
                        {new Array(marking.indent).join(" ")}
                        {marking.primary_mark}
                      </span>
                    ))}
                  </pre>
                  <pre className="lyrics">{line.lyrics}</pre>
                  <p className="notes">{line.notes}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
