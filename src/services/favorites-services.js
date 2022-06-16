import apiFetch from "./api-fetch";

export async function indexFavoritos() {
  return await apiFetch(`favorites`);
}

export async function showFavoritos(FavoritosID) {
  return await apiFetch(`favorites/${FavoritosID}`);
}
