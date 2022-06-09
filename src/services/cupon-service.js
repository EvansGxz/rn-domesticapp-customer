import apiFetch from "./api-fetch";

export async function showCupon(CuponrID) {
  return await apiFetch(`cupons/${CuponrID}`);
}