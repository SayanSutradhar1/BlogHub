import axios from "axios";
import { ApiResponse } from "./types";

const apiRequest = axios.create({
  baseURL: process.env.SERVER_BASE_URL ? `${process.env.SERVER_BASE_URL}/api` : `http://localhost:8080/api`,
});

async function apiPost<T, K = unknown>(path: string, data: T) {
  const axiosResponse = await apiRequest.post<ApiResponse<K>>(path, data);

  return axiosResponse.data;
}
async function apiGet<T>(path:string){
    const axiosResponse = await apiRequest.get<ApiResponse<T>>(path)

    return axiosResponse.data
}

export {apiPost,apiGet}