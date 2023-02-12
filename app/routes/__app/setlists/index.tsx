import { PlusIcon, QueueListIcon } from "@heroicons/react/24/solid";
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
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex items-center">
        <h1 className="flex flex-1 items-center text-3xl">
          <span className="mr-2 inline-block">
            <QueueListIcon width={"1em"} />
          </span>{" "}
          Setlists
        </h1>

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
          <div className=" rounded-md bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl font-medium text-neutral-700">
              Easily share a group of songs with friends and bandmates.
            </h2>

            <Button.Link
              to={"?modal=new-setlist"}
              className="inline-flex items-center"
            >
              <span className="mr-2">
                <PlusIcon width={"1em"} />
              </span>
              Create A Setlist
            </Button.Link>
          </div>
        )}
        {results.map((setlist) => (
          <Link
            to={`/setlists/${setlist.id}`}
            key={setlist.id}
            className="flex items-start rounded-md bg-white px-7 py-5 shadow-md transition-all  hover:shadow-xl"
          >
            <div className="mr-4">
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
              <p className="text-neutralal-500 mb-2 text-sm">
                {setlist.description}
              </p>
              <p className="text-neutralal-500 text-xs">
                {setlist.songs.length} Songs
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
