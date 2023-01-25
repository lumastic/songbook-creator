import type { ISong } from "@/types/song";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { ClientOnly } from "remix-utils";
import { Button } from "~/components/Button";
import { getSong, updateSong } from "~/db/song.db";
import { SongForm } from "forms/song";
import { formDataToJson } from "~/helpers/formDataToJson";
import { useAutoSave } from "~/lib/useAutoSave";
import { currentAuthedUser } from "~/utils/auth.server";

export async function loader({ params, request }: LoaderArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });

  const user = await currentAuthedUser(request);
  if (!user) return redirect("/");

  const song = await getSong({ id: +params.id });

  if (!song) throw new Response("Not Found", { status: 404 });

  if (song.authorId !== user.id)
    throw new Response("Not Authorized", { status: 401 });

  return typedjson({ song });
}

export default function EditSong() {
  const { song } = useTypedLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const { formRef, hasUnsavedChanges } = useAutoSave(fetcher.submit);
  return (
    <div className="max-w-xl mx-auto space-y-2">
      <div className="flex items-center">
        <div className="flex-1">
          <Button.Link
            to="/songs"
            className="inline-flex items-center text-sm"
            variant="text"
            size="sm"
          >
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width={"1em"}
                height="1em"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </span>
            <span>Back</span>
          </Button.Link>
        </div>
        <div>
          <Button.Link
            to={`/songs/${song.id}`}
            size="md"
            variant="outlined"
            className="inline-flex items-center text-sm"
          >
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width={"1em"}
                height="1em"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <span>View</span>
          </Button.Link>
        </div>
      </div>
      <div className="bg-stone-50  rounded-lg shadow-lg relative">
        <ClientOnly>
          {() => (
            <div className="absolute top-4 right-4 text-xs text-stone-400">
              {hasUnsavedChanges ? "Saving..." : "Saved"}
            </div>
          )}
        </ClientOnly>
        <div className="px-10 py-8">
          <SongForm song={song} ref={formRef} form={fetcher.Form} />
        </div>
      </div>
    </div>
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

  try {
    const updatedSong = await updateSong({
      id,
      data: {
        title,
        attribution,
        stanzas,
      },
    });
    return typedjson({ ...updatedSong });
  } catch (e) {
    throw new Response("Internal error", { status: 500 });
  }
}
