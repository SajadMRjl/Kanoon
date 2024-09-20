import axios, { AxiosError } from "axios";

interface InputProps {
  exam_session_id: string;
}

export interface Response {
  id: number;
  examSessionId: number;
  userId: number;
  responseDate: string;
  startTime: string;
}

export default async function getAllResponses({
  exam_session_id,
}: InputProps): Promise<Response[] | number> {
  const access_token = sessionStorage.getItem("access_token");
  const token_type = sessionStorage.getItem("token_type");
  const api = axios.create({
    baseURL: "https://fastapi-azmon.chbk.run/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_type} ${access_token}`,
    },
  });

  try {
    const response = await api.get(`/responses/exam/${exam_session_id}`);
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
    return -1;
  }
}
