import axios from "axios";

export default async function postImage(file: File, setImage: Function) {
  const access_token = sessionStorage.getItem("access_token");
  const token_type = sessionStorage.getItem("token_type");
  const api = axios.create({
    baseURL: "https://fastapi-azmon.chbk.app/",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${token_type} ${access_token}`,
    },
    withCredentials: false,
  });
  try {
    const formData = new FormData();
    formData.append("file", file);

    console.log();

    const response = await api.post("/upload-image/", formData);

    if (response.status === 200) {
      const data = response.data;
      setImage(data.filename);
    } else {
      console.error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}
