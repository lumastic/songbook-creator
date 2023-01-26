import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
import { createSetlist, setQRCode } from "~/db/setlist.db";
import { formDataToJson } from "~/helpers/formDataToJson";
import { currentAuthedUser } from "~/utils/auth.server";

export async function action({ request }: ActionArgs) {
  const user = await currentAuthedUser(request);
  if (!user) return redirect("/");
  const formData = formDataToJson(await request.formData());
  if (!formData.name) return;

  try {
    const setlist = await createSetlist({
      name: formData.name as string,
      description: formData?.description as string,
      authorId: user.id as number,
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
