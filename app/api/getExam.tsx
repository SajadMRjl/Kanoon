import axios, { AxiosError } from "axios";
import { ExamSurvey } from "./postExam";

interface InputProps {
  exam_id: number;
}

export interface Exam {
  title: string;
  description: string;
  isPublic: boolean;
  isActive: boolean;
  viewableByAuthorOnly: boolean;
  examSurveys: ExamSurvey[];
  id: number;
}

export default async function getExam({
  exam_id,
}: InputProps): Promise<Exam | number> {
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
    const response = await api.get(`/exams/${exam_id}`);
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
