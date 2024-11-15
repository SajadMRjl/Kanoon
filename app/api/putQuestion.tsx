import axios, { AxiosError } from "axios";
import { QuestionType, Option } from "./getQuestion";

export interface Props {
  question_id: string;
  survey_id: string;
  question: QuestionType;
}

export default async function putQuestion({
  question_id,
  survey_id,
  question,
}: Props): Promise<number> {
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
    const response = await api.put(
      `/surveys/${survey_id}/update_question/${question_id}`,
      {
        ...question,
        options: question.options?.map((option: Option) => {
          if (option.id) {
            // Keep the id for existing options
            return option;
          } else {
            // Remove the id field for new options
            const { id, ...rest } = option;
            return rest;
          }
        }),
      }
    );
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
