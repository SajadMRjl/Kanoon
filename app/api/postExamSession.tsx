import axios, { AxiosError } from "axios";

interface inputProps {
  exam_id: number;
  start_time: string;
  end_time: string;
  duration: number;
  timerOnQuestion: boolean;
}

export default async function postExamSession({
  exam_id,
  start_time,
  end_time,
  duration,
  timerOnQuestion,
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
    const response = await api.post(`/exams/${exam_id}/session/`, {
      startTime: start_time,
      endTime: end_time,
      duration: duration,
      timerOnQuestion: timerOnQuestion,
    });
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
