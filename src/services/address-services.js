import apiFetch from "./api-fetch";

export async function indexAddress() {
  return await apiFetch(`address`);
}

export async function showAddress(AddressID) {
  return await apiFetch(`address/${AddressID}`);
}

export async function createAddress(newAddress) {
  return await apiFetch('address/', { body: newAddress });
   
}