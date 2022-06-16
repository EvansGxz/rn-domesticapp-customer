import apiFetch from "./api-fetch";

export async function indexOrderDetails() {
  return await apiFetch(`order_details`);
}

export async function showOrderDetail(OrderDetailID) {
  return await apiFetch(`order_details/${OrderDetailID}`);
}

export async function createOrderDetail(newOrderDetail) {
  return await apiFetch('order_details/', { body: newOrderDetail });
   
}