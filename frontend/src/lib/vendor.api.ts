import { apiFetch } from "./api";

export const createVendorApi = (data: any) => {
  return apiFetch("/vendor", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// GET VENDOR
export const getVendorsApi = () => {
  return apiFetch("/vendor", {
    method: "GET",
  });
};


export const getVendorByIdApi = (id: string) => {
  return apiFetch(`/vendor/${id}`, {
    method: "GET",
  });
};