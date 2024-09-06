var url;

self.addEventListener('push', event => {
    let data = {};

    try {
        data = event.data.json();
    } catch (error) {
    }

    const options = {
        body: data?.body || 'No body text',
        image: data?.image || null,
        icon: data.icon || "/img/icon.png",
        badge: data.badge || null,
        vibrate: true
    };

    url = data.url || "/";

    event.waitUntil(
        self.registration.showNotification(data.title || 'No title', options)
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i];
                    }
                }
                return client.focus();
            }
            return clients.openWindow(url);
        })
    );
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('app_pwa').then(cache => {
      return cache.addAll([
        '/',
        '/js/boot.js',
        '/css/index.css',
        "/img/icon.png",
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});