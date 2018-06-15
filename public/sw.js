importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// What to show if no cached news
const FALLBACK_HEADLINE_URL = './fallback.json';

// lets pre-cache some stuff to do with displaying a fallback page
workbox.precaching.precacheAndRoute([
    FALLBACK_HEADLINE_URL, 
    './images/loading.gif', 
    './images/fetch_dog.jpg'

]);

// How are we going to handle requests for Headlines?
// Strategy: Cache First
// Cache Name: headlines-cache
// Cache Size: 200
// Cache Expiry: 1 hour
const headlinesHandler = workbox.strategies.cacheFirst({
    cacheName: 'headlines-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
              // Cache only 200 headlines
              maxEntries: 200,
              // Cache for a maximum of 1 hour
              maxAgeSeconds: 60 * 60,
            }), 
        ]
    }
);

// We need to register our headlines route with workbox and tell it what to 
// do if there's not a cache hit...
workbox.routing.registerRoute(new RegExp('https://newsapi.org/v2/top-headlines.*'), ({event}) => {
  return headlinesHandler.handle({event})
    .catch(() => caches.match(FALLBACK_HEADLINE_URL));
});

// Cache the list of sources that appear in the drop-down
// Strategy: Cache First (Cache Falling Back to Network)
// Cache Name: sources-cache
// Cache Size: -
// Cache Expiry: never!
workbox.routing.registerRoute(
    new RegExp('https://newsapi.org/v2/sources.*'),
    workbox.strategies.cacheFirst({
      cacheName: 'sources-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        })
      ]
    })
  );

// Cache JavaScript Files
// Strategy: Network First
// Cache Name: - let workbox take care of it..
// Cache Size: ??
// Cache Expiry: ??
workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.networkFirst()
  );
  
// Cache CSS
// Strategy: staleWhileRevalidate
// Cache Name: css-cache
// Cache Size: ??
// Cache Expiry: ??
  workbox.routing.registerRoute(
    // Cache CSS files
    /.*\.css/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: 'css-cache',
    })
  );
      
  // Cache Images
// Strategy: cacheFirst (Cache Falling Back to Network)
// Cache Name: image-cache
// Cache Size: 20
// Cache Expiry: 1 week
  workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif|ico)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images per time
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }), 
        new workbox.cacheableResponse.Plugin({
              statuses: [0, 200],
            })
      ],
    })
  );

  // Tell workbox where to go...
  workbox.routing.registerNavigationRoute('/index.html');