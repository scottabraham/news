const staticAssets = [
    './',
    '/static/css',
    '/static/js/bundle.js'
];

self.addEventListener('install', async event=>{
    console.log('Service Worker installed')

    const cache = await caches.open('scott-news-cache');
    cache.addAll(staticAssets);

})

self.addEventListener('fetch', event=>{
    console.log('Service Worker has intercepted a request')
})