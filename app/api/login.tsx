import axios, { AxiosError } from "axios";

interface User {
  username: string;
  password: string;
}

export default async function LoginApi({
  username,
  password,
}: User): Promise<number> {
  const api = axios.create({
    baseURL: "https://fastapi-azmon.chbk.run/",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: false,
  });

  try {
    const response = await api.post("users/login", { username, password });
    if (response.status === 200) {
      sessionStorage.setItem("access_token", response.data.access_token);
      sessionStorage.setItem("token_type", response.data.token_type);
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
