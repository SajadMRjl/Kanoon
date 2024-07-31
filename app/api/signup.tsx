import axios, { AxiosError } from "axios";

interface User {
  username: string;
  email: string;
  password: string;
}

export default async function LoginApi({
  username,
  email,
  password,
}: User): Promise<number> {
  const api = axios.create({
    baseURL: "https://fastapi-azmon.chbk.run/",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
  });

  try {
    const response = await api.post("users/register", {
      username,
      email,
      password,
    });
    if (response.status === 200) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("token_type", response.data.token_type);
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
