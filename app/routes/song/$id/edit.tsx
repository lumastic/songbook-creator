import type { ISong } from '@/types/song';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { ClientOnly } from 'remix-utils';
import { getSong, updateSong } from '~/db/song.db';
import { SongForm } from '~/forms/song';
import { formDataToJson } from '~/helpers/formDataToJson';
import { useAutoSave } from '~/lib/useAutoSave';
import { currentAuthedUser } from '~/utils/auth.server';

export async function loader({ params, request }: LoaderArgs) {
  if (!params.id) throw new Response('Not Found', { status: 404 });

  const su = await currentAuthedUser(request);

  const song = await getSong({ id: +params.id });

  if (!song) throw new Response('Not Found', { status: 404 });

  if (song.authorId !== su?.id)
    throw new Response('Not Authorized', { status: 401 });

  return typedjson({ song });
}

export default function EditSong() {
  const { song } = useTypedLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const { formRef, lastUpdatedAt } = useAutoSave(fetcher.submit);
  return (
    <main className="bg-stone-300 min-h-screen py-6">
      <div className="bg-stone-50 max-w-xl mx-auto rounded-lg shadow-lg relative">
        <ClientOnly>
          {() => (
            <div className="absolute top-4 right-4 text-xs text-stone-400">
              {fetcher.state === 'submitting'
                ? 'Saving...'
                : `Last Saved: ${lastUpdatedAt.toLocaleTimeString()}`}
            </div>
          )}
        </ClientOnly>
        <div className="px-10 py-8">
          <SongForm song={song} ref={formRef} form={fetcher.Form} />
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
    throw new Response('Internal error', { status: 500 });
  }
}
