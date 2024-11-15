import axios from "axios";

interface StaticOption {
  optionText: string;
  order: number;
  id: string;
  staticFactorImpacts: {
    factorId: number;
    impact: number;
    plus: boolean;
  };
}

const fetchStaticOptions = async (
  surveyId: string
): Promise<StaticOption[]> => {
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
    const response = await api.get(`/surveys/${surveyId}/list_static_options`);

    if (response.data && Array.isArray(response.data)) {
      return response.data.map((option: any) => ({
        optionText: option.optionText,
        order: option.order,
        id: option.id,
        staticFactorImpacts: {
          factorId: option.staticFactorImpacts[0].factorId,
          impact: option.staticFactorImpacts[0].impact,
          plus: option.staticFactorImpacts[0].plus,
        },
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching static options:", error);
    return [];
  }
};

export default fetchStaticOptions;
