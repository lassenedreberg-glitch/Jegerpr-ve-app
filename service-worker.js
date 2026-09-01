const CACHE="jegerproven-v34-clear-answer-popup";
const FILES=["./","./index.html","./questions.js","./questions-2.js","./questions-3.js","./questions-4.js","./weapon-diagrams.js","./avatar-builder.js","./question-translations.js","./question-translations-extra.js","./question-translations-nn-full.js","./question-translations-nn-extra.js","./question-translations-nn-extra2.js","./i18n.js","./glossary.js","./shop.js","./shop-icons.svg","./multiplayer.js","./multiplayer.css","./clay-game.js","./clay-game.css","./manifest.json","./jerven-icon.png","./icon-192.png","./icon-512.png","./game-background.png","./gutt-jerven.png","./jente-jerven.png","./gutt-jerven-mork-kroll.png","./jente-jerven-mork-kroll.png","./mann-jerven.png","./dame-jerven.png","./assets/dogs/tysk-jaktterrier.png","./assets/dogs/norsk-elghund-gra.png","./assets/dogs/norsk-elghund-sort.png","./assets/dogs/jamthund.png","./assets/dogs/engelsk-setter.png","./assets/dogs/dachshund.png","./assets/dogs/beagle.png","./assets/dogs/labrador.png","./assets/jaktdamer/alva-ildri-anorakk.jpg","./assets/jaktdamer/artemis-softshell-jaktjakke.jpg","./assets/jaktdamer/dog-sports-jakke-plomme.jpg","./assets/jaktdamer/freja-fleeceanorakk.jpg","./assets/jaktdamer/lappmark-ultra-bukse.jpg","./assets/jaktdamer/rikvi-jaktfleece.jpg","./assets/jaktdamer/thumbs/alva-ildri-anorakk.jpg","./assets/jaktdamer/thumbs/artemis-softshell-jaktjakke.jpg","./assets/jaktdamer/thumbs/dog-sports-jakke-plomme.jpg","./assets/jaktdamer/thumbs/freja-fleeceanorakk.jpg","./assets/jaktdamer/thumbs/lappmark-ultra-bukse.jpg","./assets/jaktdamer/thumbs/rikvi-jaktfleece.jpg"];

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
  const request=event.request;
  if(request.mode==="navigate"||new URL(request.url).pathname.endsWith("/index.html")){
    event.respondWith(fetch(request,{cache:"no-store"}).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put("./index.html",copy));return response}).catch(()=>caches.match("./index.html")));
    return;
  }
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));
});
