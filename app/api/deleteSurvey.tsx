import axios, { AxiosError } from "axios";

export default async function deleteSurvey(id: number): Promise<number> {
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
    const response = await api.delete(`/surveys/${id}`);
    if (response.status === 200) {
      return response.status;
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
