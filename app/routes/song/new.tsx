import type { ActionArgs } from "@remix-run/node";
import { SongForm } from "~/forms/song/song.form";
import { formDataToJson } from "~/helpers/formDataToJson";

export default function NewSong() {
  return <SongForm />;
}

export async function action({ request }: ActionArgs) {
  console.log(request.body);
  const formData = await request.formData();
  console.log(JSON.stringify(formDataToJson(formData)));

  //   console.log(formData.getAll("stanzas"));
  return true;
}
