import axios, { AxiosError } from "axios";

interface InputProps {
  survey_id: string;
  question_id: string;
}

export interface factor {
  factorId: number;
  impact: number;
  plus: boolean;
}

export interface Option {
  optionText: string;
  id?: number;
  questionId: number;
  factorImpacts: factor[];
  order: number;
  image: string;
}

export interface QuestionType {
  questionText: string;
  questionType: string;
  correctAnswer?: string;
  correctOption?: number;
  order: number;
  image?: string;
  options: Option[];
  point?: number;
  id: number;
}

export default async function getQuestion({
  survey_id,
  question_id,
}: InputProps): Promise<QuestionType | number> {
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
