const CACHE_VERSION = "v1";
const SHELL_CACHE = `guiaeldenring-shell-${CACHE_VERSION}`;
const CATALOG_CACHE = `guiaeldenring-catalog-${CACHE_VERSION}`;

const SHELL_ASSETS = ["/", "/manifest.webmanifest", "/icons/icon.svg", "/offline-fallback.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== CATALOG_CACHE)
          .map((key) => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

function isCatalogRequest(url) {
  return url.pathname.startsWith("/api/catalog/");
}

// Reference/catalog data: stale-while-revalidate — serve the cached response
// immediately (if any) while refreshing it in the background, so previously
// viewed content stays browsable offline.
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CATALOG_CACHE);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);

  return cached ?? (await networkFetch) ?? Response.error();
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(SHELL_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cache = await caches.open(SHELL_CACHE);
    const cached = await cache.match(request);
    if (cached) return cached;
    if (request.mode === "navigate") {
      return (await cache.match("/offline-fallback.html")) ?? Response.error();
    }
    return Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isCatalogRequest(url)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  event.respondWith(networkFirst(request));
});
