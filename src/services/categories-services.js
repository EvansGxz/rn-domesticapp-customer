import apiFetch from "./api-fetch";

export async function indexCategories() {
  return await apiFetch(`categories`);
}

export async function showCategory(CategoryID) {
  return await apiFetch(`categories/${CategoryID}`);
}