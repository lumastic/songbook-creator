import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";

import { processAuthentication } from "~/utils/auth.server";

export let loader: LoaderFunction = () => redirect("/");

export let action: ActionFunction = ({ request }) => {
  return processAuthentication(request);
};
