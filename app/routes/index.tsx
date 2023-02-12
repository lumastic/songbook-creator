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
    <div className="flex h-screen flex-col items-center justify-center bg-neutral-300">
      <h1 className="mb-4 text-center text-3xl">👋 Welcome to TuneBinder</h1>
      <div className="flex flex-col items-center justify-center space-y-3 md:flex-row md:space-y-0 md:space-x-3">
        <SignupButton />
        <LoginButton />
      </div>
    </div>
  );
}
