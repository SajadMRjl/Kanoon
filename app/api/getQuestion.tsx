import axios, { AxiosError } from "axios";

interface InputProps {
  survey_id: string;
  question_id: string;
}

export interface Option {
  optionText: string;
  id: number;
  questionId: number;
}

export interface QuestionType {
  questionText: string;
  questionType: string;
  correctAnswer: string;
  options: Option[];
}

export default async function getQuestion({
  survey_id,
  question_id,
}: InputProps): Promise<QuestionType | number> {
  const access_token = localStorage.getItem("access_token");
  const token_type = localStorage.getItem("token_type");
  const api = axios.create({
    baseURL: "https://fastapi-azmon.chbk.run/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_type} ${access_token}`,
    },
    withCredentials: false,
  });

  try {
    const response = await api.get(
      `/surveys/${survey_id}/get_question/${question_id}`
    );
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
