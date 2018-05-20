const staticAssets = [
    './',
    './fallback.json',
    './images/loading.gif',
    './images/fetch_dog.jpg',
    './styles/news.css',
    './static/js/bundle.js'
];

self.addEventListener('install', async event=>{
    console.log('Service Worker installed')

    const cache = await caches.open('scott-news-cache');
    cache.addAll(staticAssets);

})

self.addEventListener('fetch', event=>{
    console.log('Service Worker has intercepted a request')
    const req = event.request;
    const url = new URL(req.url);

    if(url.origin === location.origin){
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(networkFirst(req));
    }
    
})

async function cacheFirst(req){
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

async function networkFirst(req){
    const cache = await caches.open('news-articles');

    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
        
    } catch (error) {
        const cachedResponse = await cache.match(req);
        return cachedResponse || await caches.match('./fallback.json');
    }

}