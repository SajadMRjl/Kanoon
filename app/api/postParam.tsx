import axios from "axios";
import { Parameter } from "../components/questions/ParameterModal";

async function createParameter(
  surveyId: string,
  parameter: Omit<Parameter, "id">
) {
  const access_token = sessionStorage.getItem("access_token");
  const token_type = sessionStorage.getItem("token_type");
  const api = axios.create({
    baseURL: "https://fastapi-azmon.chbk.app/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_type} ${access_token}`,
    },
  });

  try {
    const response = await api.post(
      `/surveys/${surveyId}/parameter/`,
      parameter
    );
    return response.data; // Assume it returns created parameter with id
  } catch (error) {
    console.error("Error creating parameter:", error);
    throw error;
  }
}

export default createParameter;
