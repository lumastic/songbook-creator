import type { EntryContext } from "@remix-run/node";
import { RemixServer, useLocation, useMatches } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import * as Sentry from "@sentry/remix";
import { useEffect } from "react";
import { prisma } from "~/db/db.server";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.remixRouterInstrumentation(
        useEffect,
        useLocation,
        useMatches
      ),
    }),
    new Sentry.Integrations.Prisma({ client: prisma }),
  ],
});

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
