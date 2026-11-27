// Offline-Speicher der Rallye: Das Spiel wird beim ersten Besuch gemerkt und läuft danach auch ohne Internet.
// Neue Versionen: Eigene Dateien kommen immer zuerst frisch vom Server (am Browser-Zwischenspeicher vorbei),
// nur ohne Internet aus dem Speicher. Bei neuer Version CACHE hochzählen.
const CACHE='rallye-v204';
const FILES=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png','./favicon.ico'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin===location.origin){
    // cache:'no-cache' = beim Server nachfragen, ob es etwas Neues gibt (GitHub Pages lässt Browser sonst 10 Minuten die alte Datei nehmen)
    e.respondWith(fetch(req,{cache:'no-cache'}).then(r=>{ if(r.ok){ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); } return r; })
      .catch(()=>caches.match(req,{ignoreSearch:true}).then(r=>r||(req.mode==='navigate'?caches.match('./index.html'):undefined))));
  }
});
