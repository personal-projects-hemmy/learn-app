/* Offline cache. Course files are read from courses/index.js, so new courses are cached automatically.
   Bump VERSION after changing app files to force a clean refresh.
   HTML/JS/CSS are network-first with cache: 'no-cache' so a phone is not stuck on a
   stale HTTP-cached app.js (GitHub Pages uses max-age=600). On activate, an old cache
   is replaced and open tabs are navigated once so one reload/open is enough. */
const VERSION = 'learn-v5';
importScripts('courses/index.js');
const ASSETS = ['./', 'index.html', 'app.js', 'styles.css', 'nunito.ttf', 'manifest.webmanifest', 'courses/index.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png']
  .concat((self.COURSE_IDS || []).map(id => 'courses/' + id + '.js'));

function precache() {
  return caches.open(VERSION).then(cache => Promise.all(ASSETS.map(u =>
    fetch(u, { cache: 'no-cache' }).then(res => {
      if (!res || !res.ok) throw new Error('Failed to cache ' + u);
      return cache.put(u, res);
    })
  )));
}

self.addEventListener('install', e => { e.waitUntil(precache().then(() => self.skipWaiting())); });

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    const hadOld = keys.some(k => k !== VERSION);
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
    if (!hadOld) return;
    /* Navigate open tabs once so a phone still running the old cache-first worker
       picks up this version after a single open. A flag prevents a reload loop if
       activate re-runs when those documents are torn down. */
    const flag = new Request(new URL('__sw_nav_' + VERSION, self.registration.scope));
    const cache = await caches.open(VERSION);
    if (await cache.match(flag)) return;
    await cache.put(flag, new Response('1', { headers: { 'content-type': 'text/plain' } }));
    setTimeout(() => {
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windows => {
        windows.forEach(c => {
          const go = () => c.navigate(c.url).catch(() => {});
          if (c.focus) c.focus().then(go).catch(go); else go();
        });
      });
    }, 50);
  })());
});

function isShell(req, url) {
  if (req.mode === 'navigate') return true;
  const p = url.pathname;
  return p.endsWith('.js') || p.endsWith('.css') || p.endsWith('.html') || p.endsWith('/') || /\/learn-app\/?$/.test(p) || /\/learn\/?$/.test(p);
}

self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  const url = new URL(r.url);
  if (isShell(r, url)) {
    e.respondWith(fetch(r, { cache: 'no-cache' }).then(res => {
      if (res && res.ok) { const cp = res.clone(); caches.open(VERSION).then(c => c.put(r, cp)); }
      return res;
    }).catch(() => caches.match(r, { ignoreSearch: true }).then(hit => hit || (r.mode === 'navigate' ? caches.match('index.html') : undefined))));
    return;
  }
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(hit => {
    const net = fetch(r).then(res => { if (res && res.ok) { const cp = res.clone(); caches.open(VERSION).then(c => c.put(r, cp)); } return res; })
      .catch(() => hit);
    return hit || net;
  }));
});
