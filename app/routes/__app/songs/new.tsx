import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createSong } from "~/db/song.db";
import { requireAuthentication } from "~/utils/auth.server";

export async function action({ request }: LoaderArgs) {
  const user = await requireAuthentication(request);
  if (!user) return redirect("/");
  const newSong = await createSong({
    authorId: user.id,
  });
  return redirect(`/songs/${newSong.id}/edit`);
}

export default function () {
  return <div></div>;
}
