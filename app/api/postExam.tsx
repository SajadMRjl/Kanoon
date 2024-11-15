import axios, { AxiosError } from "axios";

export interface ExamSurvey {
  surveyId: number;
  order: number;
  id?: number;
  examId?: number;
}

export interface Exam {
  title: string;
  description: string;
  isPublic: boolean;
  isActive: boolean;
  viewableByAuthorOnly: boolean;
  examSurveys: ExamSurvey[];
}

export default async function postExam(exam: Exam): Promise<number> {
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
    const response = await api.post("/exams/", exam);
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
