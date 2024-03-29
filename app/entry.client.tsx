import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// import * as Sentry from "@sentry/remix";

// Sentry.init({
//   dsn: "",
//   tracesSampleRate: 1,
//   integrations: [
//     new Sentry.BrowserTracing({
//       routingInstrumentation: Sentry.remixRouterInstrumentation(
//         useEffect,
//         useLocation,
//         useMatches
//       ),
//     }),
//   ],
// });

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
