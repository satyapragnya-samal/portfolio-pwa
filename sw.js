self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("portfolio-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./WhatsApp Image 2025-07-30 at 10.14.52_f4f65052.jpg"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
