import type { IStanza } from "@/types/song";
import type { LoaderArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Button } from "~/components/Button";
import { getSong } from "~/db/song.db";

export async function loader({ params }: LoaderArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });

  const song = await getSong({ id: params.id });

  if (!song) throw new Response("Not Found", { status: 404 });

  return typedjson({
    song: { ...song, stanzas: JSON.parse(song.stanzas) as IStanza[] },
  });
}

export default function () {
  const { song } = useTypedLoaderData<typeof loader>();
  return (
    <div className="max-w-xl mx-auto space-y-2">
      <div className="flex items-center">
        <div className="flex-1">
          <Button.Link
            to="/song"
            className="inline-flex items-center text-sm"
            variant="text"
            size="sm"
          >
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width={"1em"}
                height="1em"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </span>
            <span>Back</span>
          </Button.Link>
        </div>
        <div>
          <Button.Link
            to={`/song/${song.id}/edit`}
            size="md"
            variant="outlined"
            className="inline-flex items-center text-sm"
          >
            <span className="mr-2">
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </span>
            <span>Edit</span>
          </Button.Link>
        </div>
      </div>
      <div className="bg-stone-50  rounded-lg shadow-lg relative">
        <div className="px-10 py-8">
          <div className="mb-4">
            <h1 className="text-4xl w-full bg-inherit py-1 outline-none hover:cursor-text resize-none">
              {song.title}
            </h1>
            <p className="text-xl w-full bg-inherit py-1 outline-none hover:cursor-text resize-none text-stone-500">
              {song.attribution}
            </p>
          </div>
          <div className="space-y-7">
            {song.stanzas.map((stanza) => (
              <div key={stanza.id} className="space-y-1">
                <p className="font-bold uppercase w-auto text-sm">
                  {stanza.type}
                </p>
                <div className="space-y-3">
                  {stanza.lines.map((line) => (
                    <div key={line.id}>
                      <div className="font-mono">
                        {line.markings?.map((mark) => (
                          <pre key={mark.id} className="inline">
                            <span>
                              {new Array(
                                parseInt(mark.indent as unknown as string) + 1
                              ).join(" ")}
                            </span>
                            <div
                              key={mark.id}
                              className="inline text-center bg-stone-200 text-stone-800 hover:opacity-60 font-mono outline-none rounded-sm"
                            >
                              {mark.mark}
                            </div>
                          </pre>
                        ))}
                      </div>
                      <p className="font-mono">{line.lyrics}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
