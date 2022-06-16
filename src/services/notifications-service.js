import apiFetch from "./api-fetch";

export async function indexNotification() {
  return await apiFetch(`notifications`);
}

export async function showNotification(NotificationID) {
  return await apiFetch(`notifications/${NotificationID}`);
}

export async function createNotification(newNotification) {
  return await apiFetch('notifications/', { body: newNotification });
}