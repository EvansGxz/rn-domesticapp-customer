import { tokenKey } from "../config";
import apiFetch from "./api-fetch";

export async function login(credentials) {
  console.log(
    "%c 🇮🇳: login -> credentials ",
    "font-size:16px;background-color:#3b0230;color:white;",
    credentials
  );
  const { token, ...user } = await apiFetch("login", {
    body: credentials,
  });

  sessionStorage.setItem(tokenKey, token);
  return user;
}

export async function logout() {
  await apiFetch("logout", { method: "DELETE" });
  sessionStorage.removeItem(tokenKey);
}
