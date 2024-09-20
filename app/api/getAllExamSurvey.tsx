import axios, { AxiosError } from "axios";

interface InputProps {
  exam_id: number;
}

export interface ExamSurvey {
  order: number;
  id: number;
  examId: number;
  surveyId: number;
}

export default async function getAllExamSurvey({
  exam_id,
}: InputProps): Promise<ExamSurvey[] | number> {
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
    const response = await api.get(`/exams/${exam_id}/survey/`);
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
