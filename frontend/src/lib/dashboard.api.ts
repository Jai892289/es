import { apiFetch } from "./api";

// GET DASHBOARD ANALYTICS
export const getDashboardAnalyticsApi = () => {
  return apiFetch("/dashboard/analytics", {
    method: "GET",
  });
};

// GET DASHBOARD SUMMARY
export const getDashboardSummaryApi = () => {
  return apiFetch("/dashboard/summary", {
    method: "GET",
  });
};



// GET ANALYTICS
export const getAnalyticsApi = () => {
  return apiFetch("/analytics", {
    method: "GET",
  });
};