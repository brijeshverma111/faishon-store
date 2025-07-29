const CACHE_NAME = 'product-images-v1';
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = request.url;
  if (
    request.destination === 'image' ||
    IMAGE_EXTENSIONS.some(ext => url.endsWith(ext))
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) {
          return cached;
        }
        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        } catch (err) {
          return cached || Response.error();
        }
      })
    );
  }
}); 