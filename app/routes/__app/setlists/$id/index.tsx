import type { IStanza } from "@/types/song";
import { Disclosure, Menu } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import type { Song } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Button } from "~/components/Button";
import { Stanza } from "~/components/Stanza";
import { getSetlist } from "~/db/setlist.db";

export async function loader({ params }: LoaderArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });

  const setlist = await getSetlist({ id: params.id });

  if (!setlist) throw new Response("Not Found", { status: 404 });

  return typedjson({
    setlist,
  });
}

export default function ViewSetlist() {
  const { setlist } = useTypedLoaderData<typeof loader>();
  const { submit } = useFetcher();
  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <div className="flex items-center">
        <div className="flex-1">
          <Button.Link
            to="/setlists"
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
      </div>
      <div className="bg-neutral-50  rounded-lg shadow-lg p-8 flex relative">
        <Button.Link
          to={`/setlists/${setlist.id}?modal=edit-setlist`}
          className="absolute top-2 right-4 text-xs flex items-center"
          size="sm"
          variant="outlined"
        >
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width={"1em"}
              height={"1em"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </span>
          Edit Details
        </Button.Link>
        <div className="text-9xl mr-4">
          <span dangerouslySetInnerHTML={{ __html: setlist.qrcode }}></span>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl">{setlist.name}</h1>
          <p className="mb-2">{setlist.description}</p>
          <p className="text-neutral-500 text-xs">
            {setlist.songs.length} Songs
          </p>
        </div>
      </div>
      <div className="flex">
        <h2 className="text-2xl flex-1">Songs</h2>
        <Button.Link
          to="?modal=add-songs"
          variant="secondary"
          className="inline-flex items-center"
        >
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width={"1em"}
              height={"1em"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
          Add Songs
        </Button.Link>
      </div>
      <div className="space-y-4">
        {setlist.songs.map((song, index) => {
          function removeSong() {
            submit(
              { "add-remove-song": "0", "song-id": song.id.toString() },
              {
                action: `/setlists/${setlist.id}/update-songs`,
                method: "post",
              }
            );
          }
          return (
            <SetlistSong
              song={song}
              order={setlist.songs.length - index}
              removeSong={removeSong}
              key={song.id}
            />
          );
        })}
      </div>
    </div>
  );
}

const SetlistSong: React.FC<{
  song: Song;
  order: number;
  removeSong: () => void;
}> = ({ song, order, removeSong }) => {
  const stanzas = JSON.parse(song.stanzas) as IStanza[];

  return (
    <Disclosure key={song.id}>
      {({ open }) => (
        <div className="shadow-md transition-all relative">
          <div
            className={`bg-white sticky top-0 bg-inherit w-full outline-none  ${
              open && "border-b border-neutral-300"
            } ${open ? "rounded-t-md" : "rounded-md"} flex items-center`}
            style={{ zIndex: order }}
          >
            <Disclosure.Button
              className={"flex-1 pl-4 py-5 flex items-center group"}
            >
              <div className="mr-3 p-2 group-hover:bg-neutral-200 transition-all rounded-full">
                <PlayIcon
                  className={`${open && "rotate-90"} text-neutral-600`}
                  width="1em"
                />
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-lg">
                  {song.title || `Untitled ${song.createdAt.toLocaleString()}`}
                </h2>
                <p className="text-xs font-bold text-neutral-500 uppercase">
                  {song.attribution || "Unknown Artist"}
                </p>
              </div>
            </Disclosure.Button>
            <Menu as="div" className="relative inline-block text-left pr-3">
              <Menu.Button as="div">
                <Button icon variant="text" size="sm" type="button">
                  <EllipsisVerticalIcon width={"1.25em"} />
                </Button>
              </Menu.Button>
              <Menu.Items className="absolute right-2 top-0 w-44 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={`/songs/${song.id}/edit`}
                        className={`${
                          active && "bg-neutral-200"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <PencilIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Edit Song
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        name="add-or-remove"
                        onClick={removeSong}
                        value={0}
                        className={`${
                          active ? "bg-red-100 text-red-800" : "text-red-700"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <TrashIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Remove Song
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>

          <Disclosure.Panel
            as="div"
            className={"px-7 py-5 bg-white rounded-b-md"}
          >
            <div className="space-y-7">
              {stanzas.map((stanza) => (
                <Stanza stanza={stanza} key={stanza.id} />
              ))}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
