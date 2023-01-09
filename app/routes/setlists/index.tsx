import type { Setlist } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Button } from "~/components/Button";
import { Search } from "~/components/Search";
import { getSetlists } from "~/db/setlist.db";
import { useSearch } from "~/lib/useSearch";

export async function loader() {
  return typedjson({ setlists: await getSetlists() });
}

export default function SetlistsIndex() {
  const { setlists } = useTypedLoaderData<typeof loader>();
  const { results, onSearch } = useSearch<Setlist>(setlists, {
    keys: ["name", "venue"],
  });
  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <div className="flex items-center">
        <h1 className="text-3xl flex-1">Setlists</h1>

        <Button.Link
          to={"?rmodal=new-setlist"}
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
          New
        </Button.Link>
      </div>
      <Search onSearch={onSearch} />
      <div className="space-y-2">
        {results.map((setlist) => (
          <Link
            to={`/setlist/${setlist.id}`}
            key={setlist.id}
            className="block bg-stone-100 px-7 py-5 rounded-md shadow-md hover:shadow-xl hover:bg-white transition-all"
          >
            <h2 className="text-lg">
              {setlist.name || `Untitled ${setlist.createdAt.toLocaleString()}`}
            </h2>
            <p className="text-xs font-bold text-stone-500 uppercase">
              {setlist.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
