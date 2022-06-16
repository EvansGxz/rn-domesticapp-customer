import { tokenKey } from "../config";
import apiFetch from "./api-fetch";

export async function getUser() {
  
  const { _token, ...user } = await apiFetch("profile");
  console.log(user);
  return user;
}

export async function createUser(newUser) {
  const { token, ...user } = await apiFetch('users', { body: newUser });
  sessionStorage.setItem(tokenKey, token);
  return user;
}

export async function updateUser(data) {
  const { _token, ...user } = await apiFetch("profile", {
    body: data,
    method: "PATCH",
  });
  return user;
}

export async function deleteUser() {
  await apiFetch("users", { method: "DELETE" });
  sessionStorage.removeItem(tokenKey);
}

export async function showEmployee(CategoryID) {
  return await apiFetch(`employee/${CategoryID}`);
}

export async function showEmploye() {
  return await apiFetch(`employee`);
}