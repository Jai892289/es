import { apiFetch } from "./api";

export const loginApi = (data: {
  email: string;
  password: string;
}) => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const registerApi = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};