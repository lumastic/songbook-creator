import { LoaderArgs, redirect } from "@remix-run/node";
import { createSong } from "~/db/song.db";
import { currentAuthedUser } from "~/utils/auth.server";

export async function action({ request }: LoaderArgs) {
  const user = await currentAuthedUser(request);
  if (!user) return redirect("/");
  const newSong = await createSong({
    authorId: user.id,
  });
  return redirect(`/songs/${newSong.id}/edit`);
}

export default function () {
  return <div></div>;
}
