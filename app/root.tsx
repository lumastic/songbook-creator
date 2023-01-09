import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindStyles from "./styles/tailwind.css";
import globalStyles from "./styles/globals.css";
import { NavBar } from "./components/NavBar";
import { ModalRoute, ModalRouter } from "./lib/remix-modals";
import { NewSetlist } from "./dialogs/NewSetlist/NewSetlist";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar />
        <main className="bg-stone-300 min-h-screen py-4 px-2 md:px-0">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <ModalRouter>
          <ModalRoute path="new-setlist" component={<NewSetlist />} />
        </ModalRouter>
      </body>
    </html>
  );
}

export function links() {
  return [
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: globalStyles },
  ];
}
