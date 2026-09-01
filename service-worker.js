const CACHE="jegerproven-v8";
const FILES=["./","./index.html","./questions.js","./shop.js","./manifest.json","./jerven-icon.png","./icon-192.png","./icon-512.png","./game-background.png","./lukas-jerven.png","./jente-jerven.png"];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
