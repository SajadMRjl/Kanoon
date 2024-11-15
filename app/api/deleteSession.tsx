import axios, { AxiosError } from "axios";

interface inputProps {
  exam_id: number;
  exam_session_id: number;
}

export default async function deleteSession({
  exam_id,
  exam_session_id,
}: inputProps): Promise<number> {
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
      `/exams/${exam_id}/session/${exam_session_id}`
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
