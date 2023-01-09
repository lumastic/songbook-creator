import type { Song } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Button } from "~/components/Button";
import { Search } from "~/components/Search";
import { getSongs } from "~/db/song.db";
import { useSearch } from "~/lib/useSearch";

export async function loader() {
  return typedjson({ songs: await getSongs() });
}

export default function SongsIndex() {
  const { songs } = useTypedLoaderData<typeof loader>();
  const { results, onSearch } = useSearch<Song>(songs, {
    keys: ["title", "attribution"],
  });
  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <div className="flex items-center">
        <h1 className="text-3xl flex-1">Songs</h1>
        <Form method="post" action="/song/new">
          <Button type="submit" className="inline-flex items-center">
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
            Add
          </Button>
        </Form>
      </div>
      <Search onSearch={onSearch} />
      <div className="space-y-2">
        {results.map((song) => (
          <Link
            to={`/song/${song.id}`}
            key={song.id}
            className="block bg-stone-100 px-7 py-5 rounded-md shadow-md hover:shadow-xl hover:bg-white transition-all"
          >
            <h2 className="text-lg">
              {song.title || `Untitled ${song.createdAt.toLocaleString()}`}
            </h2>
            <p className="text-xs font-bold text-stone-500 uppercase">
              {song.attribution || "Unknown Artist"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
