import axios, { AxiosError } from "axios";

export interface factor {
  factorId: number;
  impact: number;
  plus: boolean;
}

export interface option {
  order: number;
  image?: string;
  optionText: string;
  factorImpacts: factor[];
}

export interface InputProps {
  survey_id: string;
  questionText: string;
  questionType: string;
  correctAnswer?: string;
  options?: option[];
  correctOption?: number;
  image?: string;
  order: number;
  point?: number;
}

export default async function postQuestion({
  survey_id,
  questionText,
  questionType,
  correctAnswer,
  correctOption,
  options,
  image,
  order,
  point,
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
    const response = await api.post(`/surveys/${survey_id}/add_question`, {
      questionText,
      questionType,
      correctAnswer,
      correctOption,
      options,
      order,
      image,
      point,
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
