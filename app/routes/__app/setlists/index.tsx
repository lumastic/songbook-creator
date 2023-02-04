import { PlusIcon } from "@heroicons/react/24/solid";
import type { Setlist } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Button } from "~/components/Button";
import { Search } from "~/components/Search";
import { getSetlists } from "~/db/setlist.db";
import { useSearch } from "~/lib/useSearch";

export async function loader() {
  const setlists = await getSetlists();
  return typedjson({
    setlists,
  });
}

export default function SetlistsIndex() {
  const { setlists } = useTypedLoaderData<typeof loader>();
  const { results, onSearch } = useSearch<typeof setlists[0]>(setlists, {
    keys: ["name", "venue"],
  });
  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <div className="flex items-center">
        <h1 className="text-3xl flex-1">Setlists</h1>

        <Button.Link
          to={"?modal=new-setlist"}
          className="inline-flex items-center"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
          New
        </Button.Link>
      </div>
      <Search onSearch={onSearch} />
      <div className="space-y-2">
        {!setlists.length && (
          <div className="border-2 border-primary-500 rounded-md p-8">
            <h2 className="text-2xl font-medium mb-4 text-primary-700">
              Easily share a group of songs with friends and bandmates.
            </h2>
            <Form method="post" action="/setlists/new">
              <Button type="submit" className="inline-flex items-center">
                <span className="mr-2">
                  <PlusIcon width={"1em"} />
                </span>
                Create A Setlist
              </Button>
            </Form>
          </div>
        )}
        {results.map((setlist) => (
          <Link
            to={`/setlists/${setlist.id}`}
            key={setlist.id}
            className="bg-neutralal-100 px-7 py-5 rounded-md shadow-md hover:shadow-xl hover:bg-white transition-all flex items-start"
          >
            <div className="mr-2">
              <span
                className="text-7xl"
                dangerouslySetInnerHTML={{ __html: setlist.qrcode }}
              ></span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl">
                {setlist.name ||
                  `Untitled ${setlist.createdAt.toLocaleString()}`}
              </h2>
              <p className="text-sm text-neutralal-500 mb-2">
                {setlist.description}
              </p>
              <p className="text-xs text-neutralal-500">
                {setlist.songs.length} Songs
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
