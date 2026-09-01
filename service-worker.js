const CACHE="jegerproven-v25";
const FILES=["./","./index.html","./questions.js","./questions-2.js","./questions-3.js","./weapon-diagrams.js","./avatar-builder.js","./i18n.js","./glossary.js","./shop.js","./shop-icons.svg","./multiplayer.js","./multiplayer.css","./clay-game.js","./clay-game.css","./manifest.json","./jerven-icon.png","./icon-192.png","./icon-512.png","./game-background.png","./gutt-jerven.png","./jente-jerven.png"];

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
