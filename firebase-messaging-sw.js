importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD2hHTmoeCDfrEPTMBQ37TtgkrIfK0t6P8",
  authDomain: "seoul-chat.firebaseapp.com",
  projectId: "seoul-chat",
  storageBucket: "seoul-chat.firebasestorage.app",
  messagingSenderId: "110307693563",
  appId: "1:110307693563:web:b9cd246f0175ba2799715e"
});

const messaging = firebase.messaging();

// 백그라운드 메시지 수신 (앱이 닫혀있거나 백그라운드일 때)
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'Village Chat', {
    body: body || '',
    icon: icon || '/favicon.png',
    badge: '/favicon.png',
    data: payload.data || {},
    vibrate: [200, 100, 200],
  });
});

// 알림 클릭 시 앱 열기
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const roomId = event.notification.data?.roomId;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('village-chat.com') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('https://www.village-chat.com');
    })
  );
});
