import { apiFetch } from "./api";

// CREATE INVENTORY
export const createInventoryApi = (data: any) => {
  return apiFetch("/inventory", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// GET INVENTORY
export const getInventoryApi = () => {
  return apiFetch("/inventory", {
    method: "GET",
  });
};

export const getInventoryByIdApi = (id: string) => {
  return apiFetch(`/inventory/${id}`, {
    method: "GET",
  });
};