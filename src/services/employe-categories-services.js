import apiFetch from "./api-fetch";

export async function indexEmployeecategories() {
  return await apiFetch(`employee_categories`);
}

export async function showEmployeecategory(EmployeecategoryID) {
  return await apiFetch(`employee_categories/${EmployeecategoryID}`);
}