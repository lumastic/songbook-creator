import { LoaderArgs, redirect } from "@remix-run/node";
import { createSong } from "~/db/song.db";
import { currentAuthedUser } from "~/utils/auth.server";

export async function action({ request }: LoaderArgs) {
  const su = await currentAuthedUser(request);

  const newSong = await createSong({
    authorId: su.id,
  });
  return redirect(`/song/${newSong.id}/edit`);
}

export default function () {
  return <div></div>;
}
