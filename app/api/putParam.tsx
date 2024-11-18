import axios from "axios";
import { Parameter } from "../components/questions/ParameterModal";

async function updateParameter(
  surveyId: string,
  parameterId: string,
  parameter: Parameter
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
    const factors = parameter.factors.map((factor) => ({
      name: factor.name,
    }));
    const response = await api.put(
      `/surveys/${surveyId}/parameter/${parameterId}`,
      { name: parameter.name, factors: factors }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating parameter:", error);
    throw error;
  }
}

export default updateParameter;
