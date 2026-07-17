const CACHE_NAME = 'haris-mobile-v1'
const urlsToCache = [
  '/',
  '/login',
  '/cart',
  '/products',
]

// ✅ Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Cache opened')
        // Sirf static pages cache karein, API calls nahi
        return cache.addAll(urlsToCache).catch((error) => {
          console.log('⚠️ Some pages failed to cache:', error)
        })
      })
  )
})

// ✅ Fetch Event - Network First Strategy
self.addEventListener('fetch', (event) => {
  // Supabase API requests ko cache na karein
  if (event.request.url.includes('supabase.co')) {
    event.respondWith(fetch(event.request))
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const clonedResponse = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse)
          })
        }
        return response
      })
      .catch(() => {
        // Offline fallback
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse
            }
            // Agar cached response nahi hai toh offline page
            return caches.match('/offline')
              .then((offlineResponse) => {
                return offlineResponse || new Response('You are offline', { status: 503 })
              })
          })
      })
  )
})

// ✅ Activate Event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})