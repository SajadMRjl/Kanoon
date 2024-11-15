import axios from "axios";

async function deleteStaticFactorImpact(
  surveyId: string,
  staticFactorImpactId: string
) {
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
    const response = await api.delete(
      `/surveys/${surveyId}/delete_static_factor_impact/${staticFactorImpactId}`
    );
    return response.status === 200;
  } catch (error) {
    console.error("Failed to delete static factor impact:", error);
    return false;
  }
}

export default deleteStaticFactorImpact;
