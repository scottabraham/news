importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// Assume that this URL is precached.
const FALLBACK_HEADLINE_URL = './fallback.json';

workbox.precaching.precacheAndRoute([
    FALLBACK_HEADLINE_URL, 
    './images/loading.gif', 
    './images/fetch_dog.jpg'

]);

const headlinesHandler = workbox.strategies.cacheFirst({
    cacheName: 'headlines-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
              // Cache only 20 images per time
              maxEntries: 20,
              // Cache for a maximum of 1 hour
              maxAgeSeconds: 60 * 60,
            }), 
        ]
    }
);

workbox.routing.registerRoute(new RegExp('https://newsapi.org/v2/top-headlines.*'), ({event}) => {
  return headlinesHandler.handle({event})
    .catch(() => caches.match(FALLBACK_HEADLINE_URL));
});

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

workbox.routing.registerNavigationRoute('/index.html');

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.networkFirst()
  );
  
  workbox.routing.registerRoute(
    // Cache CSS files
    /.*\.css/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: 'css-cache',
    })
  );
      
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

  // btnAdd.addEventListener('click', (e) => {
  //   // hide our user interface that shows our A2HS button
  //   btnAdd.style.display = 'none';
  //   // Show the prompt
  //   deferredPrompt.prompt();
  //   // Wait for the user to respond to the prompt
  //   deferredPrompt.userChoice
  //     .then((choiceResult) => {
  //       if (choiceResult.outcome === 'accepted') {
  //         console.log('User accepted the A2HS prompt');
  //       } else {
  //         console.log('User dismissed the A2HS prompt');
  //       }
  //       deferredPrompt = null;
  //     });
  // });