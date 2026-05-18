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
  return apiFetch("/inspection/report", {
    method: "POST",
    body: JSON.stringify(data),
  });
};


// GET SUPERVISOR APPROVAL REPORTS
export const getInspectionApprovalApi =
  () => {
    return apiFetch(
      "/inspection/approval",
      {
        method: "GET",
      }
    )
  }