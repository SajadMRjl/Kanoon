import axios, { AxiosError } from "axios";

export interface Option {}

export interface InputProps {
  survey_id: string;
  questionText: string;
  questionType: string;
  correctAnswer: string;
  options: string[];
}

export default async function postQuestion({
  survey_id,
  questionText,
  questionType,
  correctAnswer,
  options,
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
    const response = await api.post(`/surveys/${survey_id}/add_question`, {
      questionText,
      questionType,
      correctAnswer,
      options,
    });
    return response.data.id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return -1;
      }
    }
    return -1; // fail to connect to server
  }
}
