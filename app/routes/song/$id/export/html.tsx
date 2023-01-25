import type { IStanza } from "@/types/song";
import type { LoaderArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { getSong } from "~/db/song.db";
import { makeMarkingsIndentsSpaces } from "~/helpers/makeMarkingIndentsSpaces";

export async function loader({ params }: LoaderArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });
  const song = await getSong({ id: +params.id });
  if (!song) throw new Response("Not Found", { status: 404 });

  return typedjson({ song });
}

export default function ExportHTML() {
  const { song } = useTypedLoaderData<typeof loader>();
  const { title, attribution } = song;
  const stanzas = JSON.stringify(song.stanzas) as unknown as IStanza[];
  return (
    <>
      <div>
        <h1>{title}</h1>
        <p>{attribution}</p>
      </div>
      <div className="song">
        {stanzas.map((stanza, key) => (
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
                        {marking.mark}
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
