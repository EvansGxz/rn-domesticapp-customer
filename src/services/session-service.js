import { tokenKey } from "../config";
import apiFetch from "./api-fetch";

//loginType: login, login_social & login_phone
export async function login(credentials, loginType) {
  console.log(
    "%c 🇮🇳: login -> credentials ",
    "font-size:16px;background-color:#3b0230;color:white;",
    credentials
  );
  const { token, ...user } = await apiFetch(loginType, {
    body: credentials,
  });

  sessionStorage.setItem(tokenKey, token);
  return user;
}

export async function logout() {
  await apiFetch("logout", { method: "DELETE" });
  sessionStorage.removeItem(tokenKey);
}
