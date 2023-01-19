import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "remix-typedjson";

export async function loader({ params }: LoaderArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });

  return redirect(`/setlists/${params.id}`);
}
