import { apiFetch } from "./api";

// POST COMPLAINT

export const createDepartmentApi = (data: any) => {
  return apiFetch("/departments", {
    method: "POST",
    body: JSON.stringify(data),
  });
};


// GET COMPLAINT
export const getComplaintApi = () => {
  return apiFetch("/departments", {
    method: "GET",
  });
};