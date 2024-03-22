import axios from 'axios';
import { localStorageConstant } from '../constant';

export const HOST = process.env.API_URI || 'https://api-kingify.tvtprod.com';

const Api = axios.create({
  baseURL: HOST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  withCredentials: false,
});

Api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Api.interceptors.response.use(
//   async (response) => {
//     if (response.data && (response.data.success === false || response.data.error)) {
//       const message = response.data.error
//       throw new Error(message)
//     }
//     return response
//   },
//   async (error) => {
//     if (error.response?.status === 401) {
//       if (isLoggedIn) {
//       }
//     }
//     var message = error.response ? `Error ${error.response.status}` : "Network error: " + error.config.url
//     console.warn(message)
//     return Promise.reject(error)
//   }
// )

export default Api;
