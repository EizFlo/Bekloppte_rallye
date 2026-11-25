// Offline-Speicher der Rallye: Das Spiel wird beim ersten Besuch gemerkt und läuft danach auch ohne Internet
// (der Onlinemodus braucht natürlich Internet). Neue Versionen werden beim nächsten Start geholt.
const CACHE='rallye-v170';
const FILES=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png','./favicon.ico'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin===location.origin){
    // Eigene Dateien: erst das Netz versuchen (frische Version), sonst aus dem Speicher
    e.respondWith(fetch(req).then(r=>{ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); return r; })
      .catch(()=>caches.match(req).then(r=>r||(req.mode==='navigate'?caches.match('./index.html'):undefined))));
  } else if(/peerjs/.test(url.href)){
    // PeerJS-Bibliothek: aus dem Speicher, sonst Netz
    e.respondWith(caches.match(req).then(r=>r||fetch(req).then(r2=>{ const cp=r2.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); return r2; })));
  }
});
