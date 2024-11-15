import axios, { AxiosError } from "axios";
import { ExamSurvey } from "./putExam";

interface InputProps {}

export interface Exam {
  title: string;
  description: string;
  isPublic: boolean;
  isActive: boolean;
  viewableByAuthorOnly: boolean;
  id: number;
  examSurveys: ExamSurvey[];
}

export default async function getAllExams(): Promise<Exam[] | number> {
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
    const response = await api.get(`/exams/`);
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
