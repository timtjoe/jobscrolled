import apiClient from "./jobs.client"; // The one with your custom headers

// Separate functions for each API to keep it clean
export const fetchArbeitNow = () => apiClient.get("https://arbeitnow.com/api/job-board-api");
export const fetchRise = () => apiClient.get("https://api.joinrise.io/api/v1/jobs/public?limit=20");
export const fetchJobicy = () => apiClient.get("https://jobicy.com/api/v2/remote-jobs?count=20");
export const fetchRemoteOK = () => apiClient.get("https://remoteok.com/api?api=1");