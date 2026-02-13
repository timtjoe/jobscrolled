import axios from "axios";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    // Mimicking browser to prevent 403 Forbidden from some Job APIs
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.50"
  }
});

export default apiClient;