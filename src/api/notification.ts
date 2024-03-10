import axios, { AxiosError } from "axios";

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
    return "Not Supported";
  }
  // asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
  const status = await Notification.requestPermission();
  if (status !== "granted") {
    console.log("Notification permission not granted");
    return "Permission Denied";
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
      applicationServerKey: process.env.REACT_APP_PUSH_PUBLICKEY!,
    });
  } catch (err) {
    console.log("Failed to subscribe the user: ", err);
    serviceWorker.unregister();
    return "Failed to Subscribe";
  }
  console.log("Subscribed to Push Notifications.");
  try {
    const response = await axios.post(`/notification/subscribe`, subscription);
    if (response.status !== 200) throw new Error("Server error");
    return response.data.index as string;
  } catch (e) {
    const err = e as AxiosError;
    console.log(err);
    serviceWorker.unregister();
    if (err.response?.status === 504) {
      return "Timeout";
    } else {
      return "Failed to Subscribe";
    }
  }
};

export const renew = async (index: string) => {
  if (Notification.permission !== "granted") {
    console.log("Notification permission not granted");
    try {
      await axios.post(`/notification/unsubscribe`, {
        index: index,
      });
    } catch (err) {
      console.log(err);
    }
    return null;
  }
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
