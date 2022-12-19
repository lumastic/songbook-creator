import { createMockSong } from "@/test/factories/song.factory";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createSong } from "~/db/song.db";
import { SongForm } from "~/forms/song";
import { formDataToJson } from "~/helpers/formDataToJson";

export async function loader() {
  const newSong = createMockSong();
  // console.log(JSON.stringify(newSong));
  return json({ song: newSong });
}

export default function NewSong() {
  const { song } = useLoaderData<typeof loader>();
  return (
    <main className="bg-stone-300 min-h-screen py-6">
      <div className="bg-stone-50 max-w-xl mx-auto rounded-lg shadow-lg">
        <div className="px-10 py-8">
          <SongForm song={song} />
        </div>
      </div>
    </main>
  );
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  console.log(JSON.stringify(formDataToJson(formData)));

  //   console.log(formData.getAll("stanzas"));
  return redirect("/");
}
