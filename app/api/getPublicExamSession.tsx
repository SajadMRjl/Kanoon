import axios, { AxiosError } from "axios";
import { ExamSurvey } from "./getAllExamSurvey";

export interface InputProps {
  exam_session_id: string;
}

export interface Exam {
  title: string;
  description: string;
  isActive: boolean;
  id: number;
  examSurveys: ExamSurvey[];
}

export interface ExamSession {
  startTime: string;
  endTime: string;
  duration: number;
  id: number;
  exam: Exam;
  timerOnQuestion: boolean;
}

export default async function getPublicExamSession({
  exam_session_id,
}: InputProps): Promise<ExamSession | number> {
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
    const response = await api.get(`/exams/public/${exam_session_id}`);
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
