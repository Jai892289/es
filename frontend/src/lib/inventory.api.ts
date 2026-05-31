import { apiFetch } from "./api";

// CREATE INVENTORY
export const createInventoryApi = (data: any) => {
  return apiFetch("/inventory", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// GET INVENTORY
export const getInventoryApi = (query = "") => {

  return apiFetch(
    `/inventory${query ? `?${query}` : ""}`,
    {
      method: "GET",
    }
  )
}
// export const getInventoryApi = () => {
//   return apiFetch("/inventory", {
//     method: "GET",
//   });
// };

export const getInventoryByIdApi = (id: string) => {
  return apiFetch(`/inventory/${id}`, {
    method: "GET",
  });
};

// GET ASSET STATUS ANALYTICS
export const getAssetStatusApi = () => {
  return apiFetch("/inventory/asset-status", {
    method: "GET",
  });
};

// GET ASSET TRANSFERS
export const getAssetTransfersApi = () => {
  return apiFetch("/inventory/transfers", {
    method: "GET",
  });
};

// USER-WISE ASSET MAPPINGS
export const getUserWiseAssetMappingsApi = () => {
  return apiFetch("/inventory/mappings/users", {
    method: "GET",
  });
};

// DEPARTMENT-WISE ASSET MAPPINGS
export const getDepartmentWiseAssetMappingsApi = () => {
  return apiFetch("/inventory/mappings/departments", {
    method: "GET",
  });
};

// GET ASSET REPLACEMENTS
export const getAssetReplacementsApi = () => {
  return apiFetch("/inventory/replacements", {
    method: "GET",
  });
};


// POST ASSET REPLACEMENTS
export const createAssetReplacementApi = (
  data: any
) => {
  return apiFetch(
    "/inventory/replacements",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
};


// CREATE ASSET TRANSFER
export const createAssetTransferApi = (data: any) => {
  return apiFetch("/inventory/transfers", {
    method: "POST",
    body: JSON.stringify(data),
  });
};