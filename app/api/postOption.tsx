import axios from "axios";

interface StaticFactorImpact {
  factorId: number;
  impact: number;
  plus: boolean;
}

interface OptionData {
  optionText: string;
  order: number;
  staticFactorImpacts: StaticFactorImpact[];
}

async function createOption(surveyId: string, optionData: OptionData) {
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
      `/surveys/${surveyId}/add_static_option`,
      optionData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating option:", error);
    throw error;
  }
}

export default createOption;
