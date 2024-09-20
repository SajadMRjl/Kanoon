import axios, { AxiosError } from "axios";

export interface InputProps {
  survey_id: string;
  name: string;
}

export default async function postFactor({
  survey_id,
  name,
}: InputProps): Promise<number> {
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
    const response = await api.post(`/surveys/${survey_id}/factor/`, {
      name,
    });
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return -1;
      }
    }
    return -1;
  }
}
