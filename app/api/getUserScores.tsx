import axios, { AxiosError } from "axios";

export interface Answer {
  id: number;
  responseId: number;
  questionId: number;
  creationDate: string;
  optionId: number;
  answerText: string;
  score: number;
}

export interface FactorValue {
  name: string;
  id: number;
  surveyId: number;
  value: number;
}

export interface LastAnswer {
  id: number;
  responseId: number;
  questionId: number;
  creationDate: string;
  optionId: number;
  answerText: string;
}

export interface UserScore {
  id: number;
  examSessionId: number;
  userId: number;
  responseDate: string;
  startTime: string;
  answers: Answer[];
  totalScore: number;
  factorValues: FactorValue[];
  lastAnswer: LastAnswer;
}

interface InputProps {
  exam_session_id: number;
  user_id: number;
}

export default async function getUserScores({
  exam_session_id,
  user_id,
}: InputProps): Promise<UserScore | number> {
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
      `/responses/score/${exam_session_id}/user/${user_id}`
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
    return -1;
  }
}
