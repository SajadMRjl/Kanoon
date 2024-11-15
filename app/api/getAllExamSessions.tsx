import axios, { AxiosError } from "axios";
import { Exam } from "./getExam";

export interface ExamSession {
  startTime: string;
  endTime: string;
  duration: number;
  id: number;
  examId: number;
  exam: Exam;
}

export default async function getAllExamSession(): Promise<
  ExamSession[] | number
> {
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
    const response = await api.get(`/exams/session/`);
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
