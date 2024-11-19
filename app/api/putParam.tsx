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
    const factors = parameter.factors.map((factor) => {
      // Exclude `id` if it's a UUID
      const isUUID =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          factor.id
        );
      return isUUID
        ? { name: factor.name } // Exclude `id` for UUID
        : { id: factor.id, name: factor.name }; // Include `id` otherwise
    });
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
