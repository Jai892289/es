import { apiFetch } from "./api";

// POST COMPLAINT

export const createDepartmentApi = (data: any) => {
  return apiFetch("/departments", {
    method: "POST",
    body: JSON.stringify(data),
  });
};


// GET COMPLAINT
export const getDepartmentsApi  = () => {
  return apiFetch("/departments", {
    method: "GET",
  });
};