import type { ActionArgs } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
import { addSongsToSetlist, removeSongsFromSetlist } from "~/db/setlist.db";

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const setlistId = params.id;

  const songId = formData.get("song-id") as string;
  const addOrRemove = parseInt(
    formData.get("add-or-remove") as string
  ) as number;

  if (!setlistId) throw new Response("Not Found", { status: 404 });
  if (!songId) throw new Response("No song id present", { status: 400 });

  try {
    const setlist = addOrRemove
      ? await addSongsToSetlist({
          id: setlistId,
          songs: [songId],
        })
      : await removeSongsFromSetlist({
          id: setlistId,
          songs: [songId],
        });
    return typedjson({ setlist });
  } catch (e) {
    throw new Response("Internal error", { status: 500 });
  }
}
