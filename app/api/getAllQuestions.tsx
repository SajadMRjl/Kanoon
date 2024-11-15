import axios, { AxiosError } from "axios";

interface InputProps {
  survey_id: string;
}

export interface factor {
  factorId: number;
  impact: number;
  plus: boolean;
  id: number;
}

export interface Option {
  optionText: string;
  id: number;
  image: string;
  order: number;
  factorImpacts: factor[];
}

export interface QuestionType {
  id: number;
  questionText: string;
  questionType: string;
  correctAnswer: string;
  order: number;
  image: string;
  options: Option[];
}

export default async function getAllQuestions({
  survey_id,
}: InputProps): Promise<QuestionType[] | number> {
  const access_token = sessionStorage.getItem("access_token");
  const token_type = sessionStorage.getItem("token_type");
  const api = axios.create({
    baseURL: "https://fastapi-azmon.chbk.app/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_type} ${access_token}`,
    },
  });

  try {
    const response = await api.get(`/surveys/${survey_id}/list_questions`);
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
