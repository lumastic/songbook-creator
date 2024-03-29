import type { IStanza } from "@/types/song";
import { Disclosure, Menu } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusIcon,
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
    <div className="mx-auto max-w-xl space-y-4">
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
      <div className="relative  flex rounded-lg bg-neutral-50 p-8 shadow-lg">
        <Button.Link
          to={`/setlists/${setlist.id}?modal=edit-setlist`}
          className="absolute top-2 right-4 flex items-center text-xs"
          size="sm"
          variant="text"
        >
          <span className="mr-2">
            <PencilSquareIcon width={"1em"} />
          </span>
          Edit Details
        </Button.Link>
        <div className="mr-5 text-9xl">
          <span dangerouslySetInnerHTML={{ __html: setlist.qrcode }}></span>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl">{setlist.name}</h1>
          <p className="mb-2">{setlist.description}</p>
          <p className="text-xs text-neutral-500">
            {setlist.songs.length} Songs
          </p>
        </div>
      </div>
      <div className="flex">
        <h2 className="flex-1 text-2xl">Songs</h2>
        {!!setlist.songs.length && (
          <Button.Link
            to="?modal=add-songs"
            variant="primary"
            className="inline-flex items-center"
          >
            <span className="mr-2">
              <PlusIcon width={"1em"} />
            </span>
            Add Songs
          </Button.Link>
        )}
      </div>
      <div className="space-y-4">
        {!setlist.songs.length && (
          <div className=" rounded-md bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl font-medium text-neutral-700">
              Start adding songs to this setlist.
            </h2>
            <Button.Link
              to="?modal=add-songs"
              variant="primary"
              className="inline-flex items-center"
            >
              <span className="mr-2">
                <PlusIcon width={"1em"} />
              </span>
              Add Songs
            </Button.Link>
          </div>
        )}
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
        <div className="relative shadow-md transition-all">
          <div
            className={`sticky top-0 w-full bg-white bg-inherit outline-none  ${
              open && "border-b border-neutral-300"
            } ${open ? "rounded-t-md" : "rounded-md"} flex items-center`}
            style={{ zIndex: order }}
          >
            <Disclosure.Button
              className={"group flex flex-1 items-center py-5 pl-4"}
            >
              <div className="mr-3 rounded-full p-2 transition-all group-hover:bg-neutral-200">
                <PlayIcon
                  className={`${open && "rotate-90"} text-neutral-600`}
                  width="1em"
                />
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-lg">
                  {song.title || `Untitled ${song.createdAt.toLocaleString()}`}
                </h2>
                <p className="text-xs font-bold uppercase text-neutral-500">
                  {song.attribution || "Unknown Artist"}
                </p>
              </div>
            </Disclosure.Button>
            <Menu as="div" className="relative inline-block pr-3 text-left">
              <Menu.Button as="div">
                <Button icon variant="text" size="sm" type="button">
                  <EllipsisVerticalIcon width={"1.25em"} />
                </Button>
              </Menu.Button>
              <Menu.Items className="divide-gray-100 absolute right-2 top-0 z-20 w-44 divide-y rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
            className={"rounded-b-md bg-white px-7 py-5"}
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
