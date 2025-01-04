const backend_url =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://job-portal-q5bb.onrender.com";
export const USER_API_END_POINT = `${backend_url}/api/v1/user`;
export const JOB_API_END_POINT = `${backend_url}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${backend_url}/api/v1/application`;
export const COMPANIES_API_END_POINT = `${backend_url}/api/v1/company`;
