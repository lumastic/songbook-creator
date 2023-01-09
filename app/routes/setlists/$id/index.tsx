import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { typedjson } from "remix-typedjson";
import { Button } from "~/components/Button";
import { getSetlist } from "~/db/setlist.db";

export async function loader({ params }: LoaderArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });

  const setlist = await getSetlist({ id: params.id });

  if (!setlist) throw new Response("Not Found", { status: 404 });

  return typedjson({
    setlist,
  });
}

export default function ViewSetlist() {
  const { setlist } = useLoaderData<typeof loader>();
  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <div className="flex items-center">
        <div className="flex-1">
          <Button.Link
            to="/setlists"
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
      </div>
      <div className="bg-stone-50  rounded-lg shadow-lg p-8 flex relative">
        <Button.Link
          to={`/setlists/${setlist.id}?rmodal=edit-setlist`}
          className="absolute top-2 right-4 text-xs flex items-center"
          size="sm"
          variant="outlined"
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
          Edit Details
        </Button.Link>
        <div className="text-9xl mr-4">
          <span dangerouslySetInnerHTML={{ __html: setlist.qrcode }}></span>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl">{setlist.name}</h1>
          <p className="mb-2">{setlist.description}</p>
          <p className="text-stone-500 text-xs">{setlist.songs.length} Songs</p>
        </div>
      </div>
    </div>
  );
}
