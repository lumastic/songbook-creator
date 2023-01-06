import { redirect } from "@remix-run/node";
import { createSong } from "~/db/song.db";

export async function action() {
  const newSong = await createSong();
  console.log(newSong);
  return redirect(`/song/${newSong.id}/edit`);
}

export default function () {
  return <div></div>;
}
