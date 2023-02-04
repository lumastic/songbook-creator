import { PlusIcon } from "@heroicons/react/24/solid";
import type { Song } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Button } from "~/components/Button";
import { Search } from "~/components/Search";
import { getSongsByUserId } from "~/db/song.db";
import { useSearch } from "~/lib/useSearch";
import { requireAuthentication } from "~/utils/auth.server";

export async function loader({ request }: LoaderArgs) {
  const user = await requireAuthentication(request);
  return typedjson({ songs: await getSongsByUserId(user.id) });
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
        <Form method="post" action="/songs/new">
          <Button type="submit" className="inline-flex items-center">
            <span className="mr-2">
              <PlusIcon width={"1em"} />
            </span>
            Add
          </Button>
        </Form>
      </div>
      <Search onSearch={onSearch} />
      <div className="space-y-2">
        {!songs.length && (
          <div className="border-2 border-primary-500 rounded-md p-8">
            <h2 className="text-2xl font-medium mb-4 text-primary-700">
              Add a song and start jamming!
            </h2>
            <Form method="post" action="/songs/new">
              <Button type="submit" className="inline-flex items-center">
                <span className="mr-2">
                  <PlusIcon width={"1em"} />
                </span>
                Add Song
              </Button>
            </Form>
          </div>
        )}
        {results.map((song) => (
          <Link
            to={`/songs/${song.id}`}
            key={song.id}
            className="block bg-white px-7 py-5 rounded-md shadow-md hover:shadow-xl hover:bg-white transition-all"
          >
            <h2 className="text-lg">
              {song.title || `Untitled ${song.createdAt.toLocaleString()}`}
            </h2>
            <p className="text-xs font-bold text-neutral-500 uppercase">
              {song.attribution || "Unknown Artist"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
