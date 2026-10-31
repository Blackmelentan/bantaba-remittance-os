/* Bantaba Remittance OS — Service Worker v1.0 */
const CACHE = "bantaba-v1";
const ASSETS = [
  "/bantaba-remittance-os/",
  "/bantaba-remittance-os/index.html",
  "/bantaba-remittance-os/src/ui/styles.css",
  "/bantaba-remittance-os/src/ui/main.js",
  "/bantaba-remittance-os/src/engine/core.js",
  "/bantaba-remittance-os/src/engine/crypto.js",
  "/bantaba-remittance-os/src/engine/defaults.js",
  "/bantaba-remittance-os/src/engine/fx.js",
  "/bantaba-remittance-os/src/engine/ledger.js",
  "/bantaba-remittance-os/src/engine/money.js",
  "/bantaba-remittance-os/src/engine/names.js",
  "/bantaba-remittance-os/public/brand/bantaba-logo.png",
  "/bantaba-remittance-os/public/favicon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  /* Network-first for API/dynamic; cache-first for static assets */
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request).then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      });
      return cached || network;
    })
  );
});
