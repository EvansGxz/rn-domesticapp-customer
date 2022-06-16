import apiFetch from "./api-fetch";

export async function indexReviews() {
  return await apiFetch(`reviews`);
}

export async function showReviews(ReviewsID) {
  return await apiFetch(`reviews/${ReviewsID}`);
}

export async function createReviews(newReviews) {
  return await apiFetch('reviews/', { body: newReviews });
   
}