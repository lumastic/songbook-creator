import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
import { createSetlist, setQRCode } from "~/db/setlist.db";
import { formDataToJson } from "~/helpers/formDataToJson";

export async function action({ request }: ActionArgs) {
  const formData = formDataToJson(await request.formData());
  if (!formData.name) return;

  try {
    const setlist = await createSetlist({
      name: formData.name as string,
      description: formData?.description as string,
    });
    await setQRCode(setlist, request);
    return redirect(`/setlists`);
  } catch (e) {
    console.error(e);
    return typedjson({ error: "Something went wrong creating that setlist" });
  }
}

export default function () {
  return <div></div>;
}
