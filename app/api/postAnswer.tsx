import axios, { AxiosError } from "axios";

export interface InputProps {
  questionId: number;
  optionId?: number;
  answerText?: string;
  exam_session_id: string;
}

export default async function postAnswer({
  questionId,
  optionId,
  answerText,
  exam_session_id,
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
    const response = await api.post(
      `/responses/${exam_session_id}/add_answer`,
      { questionId, optionId, answerText }
    );
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
