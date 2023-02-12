import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import type { Song } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { UseDataFunctionReturn } from "remix-typedjson/dist/remix";
import { useRouteData } from "remix-utils";
import { Button } from "~/components/Button";
import { Dialog } from "~/components/Dialog";
import { Input } from "~/components/Input";
import { Search } from "~/components/Search";
import { useModalFetcher } from "~/lib/remix-modals";
import { useModal } from "~/lib/remix-modals/useModal";
import { useSearch } from "~/lib/useSearch";
import type { loader as SetlistLoader } from "~/routes/__app/setlists/$id/index";

export function AddSongs() {
  const setlistData = useRouteData<UseDataFunctionReturn<typeof SetlistLoader>>(
    "routes/__app/setlists/$id/index"
  );

  const { Form, action } = useModalFetcher(
    `/setlists/${setlistData?.setlist.id}/update-songs`
  );

  const { load: loadSongs, data: songsData } = useFetcher();
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    loadSongs("/songs?index");
  }, [loadSongs]);

  useEffect(() => {
    if (songsData) setSongs(songsData?.songs);
  }, [songsData]);

  const { results, onSearch } = useSearch<Song>(songs, {
    keys: ["title", "attribution"],
  });

  const { isOpen, close } = useModal();
  return (
    <Dialog title="Add Songs" isOpen={isOpen} onClose={close}>
      <div className="space-y-4">
        <Search onSearch={onSearch} autoFocus />
        {results.map((song: Song) => (
          <div key={song.id} className="flex items-center">
            <div className="flex-1">
              <h3 className="text-xl">{song.title}</h3>
              <p className="text-xs font-bold uppercase text-neutral-500">
                {song.attribution}
              </p>
            </div>
            <div>
              <Form action={action} method="post">
                <Input hidden name="song-id" value={song.id} readOnly />
                {setlistData?.setlist.songs
                  .map((song) => song.id)
                  .includes(song.id) ? (
                  <Button
                    type="submit"
                    name="add-or-remove"
                    value={0}
                    icon
                    variant="secondary"
                    size="sm"
                  >
                    <MinusIcon width={"1em"} />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    name="add-or-remove"
                    value={1}
                    icon
                    variant="secondary"
                    size="sm"
                  >
                    <PlusIcon width={"1em"} />
                  </Button>
                )}
              </Form>
            </div>
          </div>
        ))}
      </div>
    </Dialog>
  );
}
