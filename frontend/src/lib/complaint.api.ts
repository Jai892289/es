import { apiFetch } from "./api";

// POST COMPLAINT

export const createComplaintApi = (data: any) => {
  return apiFetch("/complaint", {
    method: "POST",
    body: JSON.stringify(data),
  });
};


// GET COMPLAINT
export const getComplaintApi = () => {
  return apiFetch("/complaint", {
    method: "GET",
  });
};