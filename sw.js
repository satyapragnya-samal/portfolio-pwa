// sw.js
const CACHE_NAME = "portfolio-cache-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./WhatsApp Image 2025-07-30 at 10.14.52_f4f65052.jpg"
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // activate this SW immediately after install
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  // clean old caches
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  return self.clients.claim(); // take control of open pages
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
