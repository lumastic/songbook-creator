import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import globalStyles from "./styles/globals.css";
import tailwindStyles from "./styles/tailwind.css";
import { withSentry } from "@sentry/remix";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "TuneBinder",
  viewport: "width=device-width,initial-scale=1",
});

function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
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

export default withSentry(App);
