/* eslint-disable no-restricted-globals */
const defaultOptions = {
  data: {
    url: "https://eesast.com",
  },
  icon: "./logo.png",
  badge: "./logo.png",
  vibrate: [200, 100, 200],
};

function receivePushNotification(event) {
  console.log("[Service Worker] Push Received.");

  const notification = event.data.json();

  const options = {
    ...defaultOptions,
    ...notification.options,
  };

  event.waitUntil(
    self.registration.showNotification(notification.title, options),
  );
}

function openPushNotification(event) {
  console.log(
    "[Service Worker] Notification click Received.",
    event.notification.data,
  );

  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientsArr) => {
      // If a Window tab matching the targeted URL already exists, focus that;
      const hadWindowToFocus = clientsArr.some((windowClient) =>
        windowClient.url === event.notification.data.url
          ? (windowClient.focus(), true)
          : false,
      );
      // Otherwise, open a new tab to the applicable URL and focus it.
      if (!hadWindowToFocus)
        self.clients
          .openWindow(event.notification.data.url)
          .then((windowClient) => (windowClient ? windowClient.focus() : null));
    }),
  );
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);
