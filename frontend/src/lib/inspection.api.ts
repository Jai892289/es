import { apiFetch } from "./api";

// GET INSPECTIONS
export const getInspectionsApi = () => {
  return apiFetch("/inspection", {
    method: "GET",
  });
};

// CREATE INSPECTION REPORT
export const createInspectionReportApi = (
  data: any
) => {
  return apiFetch("/inspection", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// GET SUPERVISOR APPROVAL REPORTS
export const getInspectionApprovalApi = () => {
  return apiFetch(
    "/inspection/approval",
    {
      method: "GET",
    }
  );
};

// APPROVE REPORT
export const approveInspectionReportApi = (
  id: string
) => {
  return apiFetch(
    `/inspection/approval/${id}/approve`,
    {
      method: "PUT",
    }
  );
};

// REJECT REPORT
export const rejectInspectionReportApi = (
  id: string
) => {
  return apiFetch(
    `/inspection/approval/${id}/reject`,
    {
      method: "PUT",
    }
  );
};