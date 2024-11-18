import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";

interface InputProps {
  survey_id: string;
  parameter_id: string;
}

export default async function deleteParameter({
  survey_id,
  parameter_id,
}: InputProps): Promise<number> {
  const access_token = sessionStorage.getItem("access_token");
  const token_type = sessionStorage.getItem("token_type");
  const api = axios.create({
    baseURL: "https://fastapi-azmon.chbk.app/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_type} ${access_token}`,
    },
    withCredentials: false,
  });

  try {
    const response = await api.delete(
      `/surveys/${survey_id}/parameter/${parameter_id}`
    );
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
