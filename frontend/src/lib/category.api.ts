import { apiFetch } from "./api";

// CREATE CATEGORY
export const createCategoryApi = async (data: any) => {
  return apiFetch("/inventory/create-category", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// GET CATEGORY
export const getCategoryApi = async () => {
  return apiFetch("/inventory/category", {
    method: "GET",
  });
};