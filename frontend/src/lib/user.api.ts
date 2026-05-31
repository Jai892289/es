import { apiFetch } from "./api";

// CREATE USER
export const createUserApi = (data: any) => {
  return apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// GET USERS
export const getUsersApi = () => {
  return apiFetch("/users", {
    method: "GET",
  });
};

