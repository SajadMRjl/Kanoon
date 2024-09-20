import axios, { AxiosError } from "axios";
import { Survey } from "./getSurvey";

export interface ExamSurvey {
  surveyId: number;
  order: number;
  id?: number;
  examId?: number;
  survey?: Survey;
}

export interface Exam {
  title: string;
  description: string;
  isPublic: boolean;
  isActive: boolean;
  viewableByAuthorOnly: boolean;
  examSurveys: ExamSurvey[];
  id?: number;
}

interface inputProps {
  id: number;
  exam: Exam;
}

export default async function putExam({
  id,
  exam,
}: inputProps): Promise<number> {
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
    const response = await api.put(`/exams/${id}`, exam);
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
