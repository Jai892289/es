import { apiFetch } from "./api";

export const loginApi = (
  data: {
    email: string;
    password: string;
  }
) => {
  return apiFetch(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
};

export const registerApi = (
  data: {
    name: string;
    email: string;
    password: string;
  }
) => {
  return apiFetch(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
};


export const updateUserApi = (
  id: string,
  data: any
) => {
  return apiFetch(
    `/auth/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
};

export const deactivateUserApi = (
  id: string
) => {
  return apiFetch(
    `/auth/${id}/deactivate`,
    {
      method: "PATCH",
    }
  );
};

export const activateUserApi = (
  id: string
) => {
  return apiFetch(
    `/auth/${id}/activate`,
    {
      method: "PATCH",
    }
  );
};