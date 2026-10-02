/* Padosi Pro — Service Worker (Web Push notifications) */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('push', event => {
  let data = { title: 'Padosi Pro', body: 'Naya update aaya hai!', icon: 'notifications' };
  try { if (event.data) data = { ...data, ...event.data.json() }; } catch (e) {}
  const icon = 'https://lh3.googleusercontent.com/aida/AEtjO1XLLUPFADslrduwTP6ZkTBe07WEWV3VhQEVi2UYEOzZAa31WD9xi_-dd22iNU5QhCDWQ3-muojCxcRqK2V0VWOP1xqYvJ8z1EhlFYplAHXe5nSS9FewpGYecw0xlrNR6Z5yqfSn8KT4hYOCJ5PYHj2Udf016Q8LklgvCQMFT_38QgyWkkAV1kAOj2sdKe9S8BQPc3f4FHU1qGW617GZArN97vy2a2e3eL2n1aa_9NuXFPKck0hZCHFYhdQ';
  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    icon,
    badge: icon,
    tag: 'padosi-pro',
    vibrate: [100, 50, 100],
    data: { url: '/' }
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clientsArr => {
      const hadWindow = clientsArr.find(c => 'focus' in c);
      if (hadWindow) return hadWindow.focus();
      return self.clients.openWindow('/');
    })
  );
});
