import { apiFetch } from "./api";

export const getProjectsApi = () => {
  return apiFetch("/project");
};

export const getProjectByIdApi = (
  id: string
) => {
  return apiFetch(
    `/project/${id}`
  );
};


export const createProjectApi = (
  data: any
) => {
  return apiFetch(
    "/project",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
};