import axios, { AxiosError } from "axios";

export interface Survey {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  isPublic: boolean;
  viewableByAuthorOnly: boolean;
  id: number;
}

export default async function getSurveyList(): Promise<Survey[] | number> {
  const access_token = localStorage.getItem("access_token");
  const token_type = localStorage.getItem("token_type");
  const api = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_type} ${access_token}`,
    },
    withCredentials: false,
  });

  try {
    const response = await api.get("/surveys");
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
