import axios, { AxiosError } from "axios";
import { Parameter } from "../components/questions/ParameterModal";

// Function to fetch predefined parameters for a survey
async function fetchParameters(
  surveyId: string
): Promise<Parameter[] | number> {
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
    const response = await api.get(`/surveys/${surveyId}/parameter/`);
    if (response.status === 200) {
      // Map response to match `Parameter` type
      return response.data.map((param: any) => ({
        id: param.id.toString(),
        name: param.name,
        factors: param.factors.map((factor: any) => ({
          id: factor.id.toString(),
          name: factor.name,
          options: [], // Assuming `options` is not provided in the API response
        })),
      }));
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
export default fetchParameters;
