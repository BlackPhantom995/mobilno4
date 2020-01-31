const staticCacheName = 'site-static-v2';
const assets = [
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/pages/indexOfline.html',
  '/pages/aboutOfline.html',
  '/pages/contactOfline.html'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});


const switchUrl = url => url.includes('html') ? url.replace('.html', 'Ofline.html') : url

self.addEventListener('fetch', evt => {
  evt.respondWith(
    fetch(evt.request)
      .then(fetchRes => fetchRes)
      .catch(() => {
        if (evt.request.url.includes('about.html')) { return caches.match('/pages/aboutOfline.html') }
        if (evt.request.url.includes('contact.html')) { return caches.match('/pages/contactOfline.html') }
        if (evt.request.url.includes('index.html')) { return caches.match('/pages/indexOfline.html') }
        if (evt.request.url.endsWith('/')) { return caches.match('/pages/indexOfline.html') }
        return caches.match(evt.request)
      })
  );
});
