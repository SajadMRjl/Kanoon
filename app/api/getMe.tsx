import axios, { AxiosError } from "axios";

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  identity_code: string;
  role: string;
}

export default async function getMe(): Promise<User | number> {
  const access_token = sessionStorage.getItem("access_token");
  const token_type = sessionStorage.getItem("token_type");
  const api = axios.create({
    baseURL: "https://fastapi-azmon.chbk.run/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_type} ${access_token}`,
    },
    withCredentials: false,
  });

  try {
    const response = await api.get(`/users/me`);
    if (response.status === 200) {
      return response.data;
    }
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return axiosError.response.status;
      }
    }
    return -1; // fail to connect to server
  }
}
