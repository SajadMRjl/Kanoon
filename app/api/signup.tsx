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
}: User): Promise<string> {
  const api = axios.create({
    baseURL: "https://fastapi-azmon.chbk.app/",
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
      return "ثبت نام انجام شد";
    }
    return "ثبت نام انجام شد";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ detail: string }>;
      if (axiosError.response) {
        const errorDetail = axiosError.response.data?.detail;

        if (errorDetail === "Email already registered") {
          return "ایمیل قبلا ثبت شده است";
        } else if (error.status === 500) {
          return "نام کاربری قبلا گرفته شده است";
        } else if (errorDetail === "Phone number already registered") {
          return "شماره تلفن قبلا ثبت شده است";
        }
      }
    }
    return "خطا در برقراری ارتباط با سرور";
  }
}
