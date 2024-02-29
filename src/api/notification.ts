import axios from "axios";

export interface Notification {
  title: string;
  options: {
    body?: string;
    icon?: string;
    data?: any;
    timestamp?: number;
    vibrate?: number[];
    tag?: string;
    image?: string;
    badge?: string;
    actions?: { action: string; title: string; icon?: string }[];
  };
}

export const subscribe = async () => {
  // checks if Push notification and service workers are supported by your browser
  if (!("serviceWorker" in navigator && "PushManager" in window)) {
    console.log("Service Worker and Push are not supported");
    return "";
  }
  // asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
  const status = await Notification.requestPermission();
  if (status !== "granted") {
    console.log("Notification permission not granted");
    return "";
  }
  // register service worker
  navigator.serviceWorker.register("./serviceworker.js");
  const serviceWorker = await navigator.serviceWorker.ready;
  console.log("Service Worker is ready.");
  // register push notification, and send it to the server
  let subscription: PushSubscription;
  try {
    subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_PUSH_PUBLICKEY,
    });
  } catch (err) {
    console.log("Failed to subscribe the user: ", err);
    return "";
  }
  console.log("Subscribed to Push Notifications.");
  try {
    const response = await axios.post(`/notification/subscribe`, subscription);
    return response.data.index as string;
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const renew = async (index: string) => {
  try {
    const serviceWorker = await navigator.serviceWorker.ready;
    const subscription = await serviceWorker.pushManager.getSubscription();
    if (!subscription) throw new Error("Subscription not found");
    const response = await axios.post(`/notification/check`, subscription);
    if (!response.data.subscribed) {
      await axios.post(`/notification/unsubscribe`, {
        index: index,
      });
      const response = await axios.post(
        `/notification/subscribe`,
        subscription,
      );
      return response.data.index as string;
    }
    return index;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const unsubscribe = async (index: string) => {
  try {
    await axios.post(`/notification/unsubscribe`, {
      index: localStorage.getItem("subscription"),
    });
    return;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const broadcast = async (notification: Notification) => {
  try {
    await axios.post(`/notification/broadcast`, notification);
  } catch (err) {
    console.log(err);
  }
};
