import type { ISong } from "@/types/song";
import { EyeIcon } from "@heroicons/react/24/outline";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { SongForm } from "forms/song";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { ClientOnly } from "remix-utils";
import { Button } from "~/components/Button";
import { getSong, updateSong } from "~/db/song.db";
import { formDataToJson } from "~/helpers/formDataToJson";
import { useAutoSave } from "~/lib/useAutoSave";
import { requireAuthentication } from "~/utils/auth.server";

export async function loader({ params, request }: LoaderArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });

  const user = await requireAuthentication(request);

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
            className="inline-flex items-center text-sm opacity-70"
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
            variant="secondary"
            className="inline-flex items-center text-sm"
          >
            <span className="mr-2">
              <EyeIcon width={"1em"} />
            </span>
            <span>View</span>
          </Button.Link>
        </div>
      </div>
      <div className="bg-neutral-50  rounded-lg shadow-lg relative">
        <ClientOnly>
          {() => (
            <div className="absolute top-4 right-4 text-xs text-neutral-400">
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
