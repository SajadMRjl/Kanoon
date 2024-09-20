import axios, { AxiosError } from "axios";

interface InputProps {
  exam_session_id: string;
}

export interface Option {
  optionText: string;
  order: number;
  image: string;
  id: number;
}

export interface Question {
  questionText: string;
  image: string;
  order: number;
  questionType: string;
  id: number;
  surveyId: number;
  options: Option[];
}

export default async function getPublicExamAllQuestions({
  exam_session_id,
}: InputProps): Promise<Question[] | number> {
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
    const response = await api.get(
      `/exams/session/${exam_session_id}/list_questions/`
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
    return -1;
  }
}
