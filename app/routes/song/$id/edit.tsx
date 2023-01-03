import { ISong } from "@/types/song";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { ClientOnly } from "remix-utils";
import { getSong, updateSong } from "~/db/song.db";
import { SongForm } from "~/forms/song";
import { formDataToJson } from "~/helpers/formDataToJson";
import { useAutoSave } from "~/lib/useAutoSave";

export async function loader({ params }: LoaderArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });

  const song = await getSong({ id: params.id });

  if (!song) throw new Response("Not Found", { status: 404 });
  // console.log(JSON.stringify(newSong));
  return typedjson({ song });
}

export default function EditSong() {
  const { song } = useTypedLoaderData<typeof loader>();
  const submit = useSubmit();
  const { formRef, lastUpdatedAt } = useAutoSave(submit);
  return (
    <main className="bg-stone-300 min-h-screen py-6">
      <div className="bg-stone-50 max-w-xl mx-auto rounded-lg shadow-lg relative">
        <ClientOnly>
          {() => (
            <div className="absolute top-4 right-4 text-xs text-stone-400">
              Last Saved: {lastUpdatedAt.toLocaleTimeString()}
            </div>
          )}
        </ClientOnly>
        <div className="px-10 py-8">
          <SongForm song={song} ref={formRef} />
        </div>
      </div>
    </main>
  );
}

export async function action({ request }: ActionArgs) {
  const formDataAsJson = formDataToJson(
    await request.formData()
  ) as unknown as ISong;
  const id = formDataAsJson.id;
  const title = formDataAsJson.title;
  const attribution = formDataAsJson.attribution;
  const stanzas = JSON.stringify(formDataAsJson.stanzas);
  console.log({ id, title, attribution, stanzas });

  try {
    await updateSong({
      id,
      data: {
        title,
        attribution,
        stanzas,
      },
    });
  } catch (e) {
    throw new Response("Internal error", { status: 500 });
  }

  return redirect(`/song/${id}/edit`);
}
