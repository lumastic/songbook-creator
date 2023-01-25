import type { LoaderArgs } from "@remix-run/node";
import { LoginButton } from "forms/login";
import { SignupButton } from "forms/signup";
import { redirect } from "remix-typedjson";
import { currentAuthedUser } from "~/utils/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  const currentUser = await currentAuthedUser(request);
  if (currentUser) return redirect("/songs");
  return true;
};

export default function Landing() {
  return (
    <div className="h-screen flex items-center flex-col justify-center bg-stone-300">
      <h1 className="text-center text-3xl mb-4">👋 Welcome to PubJam</h1>
      <div className="flex items-center justify-center space-x-3">
        <SignupButton />
        <LoginButton />
      </div>
    </div>
  );
}
