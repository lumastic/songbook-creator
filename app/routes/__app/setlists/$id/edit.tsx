import type { Setlist } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "remix-typedjson";
import { updateSetlist } from "~/db/setlist.db";
import { formDataToJson } from "~/helpers/formDataToJson";

export async function action({ request, params }: ActionArgs) {
  const formDataAsJson = formDataToJson(
    await request.formData()
  ) as unknown as Setlist;
  const id = params.id;
  if (!id) throw new Response("Not Found", { status: 404 });
  const name = formDataAsJson.name;
  const description = formDataAsJson.description;

  try {
    const updatedSetlist = await updateSetlist({
      id,
      data: {
        name,
        description,
      },
    });
    return redirect(`/setlists/${updatedSetlist.id}`);
  } catch (e) {
    throw new Response("Internal error", { status: 500 });
  }
}
