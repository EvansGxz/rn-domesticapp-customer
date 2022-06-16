import apiFetch from "./api-fetch";

export async function indexHEmployee() {
  return await apiFetch(`hability_employees`);
}

export async function showHEmployee(HEmployeeID) {
  return await apiFetch(`hability_employees/${HEmployeeID}`);
}

export async function createHEmployee(newHEmployee) {
  return await apiFetch('hability_employees/', { body: newHEmployee });
   
}