import axios, { AxiosError } from "axios";

interface User {
  first_name: string;
  last_name: string;
  phone_number: string;
  username: string;
  email: string;
  password: string;
  identity_code: string;
}

export default async function LoginApi({
  first_name,
  last_name,
  phone_number,
  username,
  email,
  password,
  identity_code,
}: User): Promise<number> {
  const api = axios.create({
    baseURL: "https://fastapi-azmon.chbk.run/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const response = await api.post("users/register", {
      first_name,
      last_name,
      phone_number,
      username,
      email,
      password,
      identity_code,
    });
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
