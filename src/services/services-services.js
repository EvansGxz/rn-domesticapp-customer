import apiFetch from "./api-fetch";

export async function indexServices() {
  return await apiFetch(`services`);
}

export async function showService(ServiceID) {
  return await apiFetch(`services/${ServiceID}`);
}