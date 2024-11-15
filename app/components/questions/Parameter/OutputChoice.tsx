import { CFormCheck } from "@coreui/react";
import "./OutputChoice.css";
import { useEffect, useState } from "react";

interface InputProps {
  index: number;
  text: string;
  image?: string;
  checkedAnswer: number;
  setCheckedAnswer: Function;
}

export default function OutputChoice({
  index,
  text,
  image,
  checkedAnswer,
  setCheckedAnswer,
}: InputProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    const token_type = sessionStorage.getItem("token_type");

    const imageUrl = `https://fastapi-azmon.chbk.app/images/${image}`;
    async function fetchImage() {
      try {
        const response = await fetch(imageUrl, {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);

        setImageSrc(imageObjectURL); // Set the image src in state
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    }
    if (image) fetchImage();
  }, [image]);

  return (
    (text || image) && (
      <div
        className="output-choice"
        onClick={() => setCheckedAnswer(index - 1)}
      >
        <div className="index">{index}</div>
        <div className="output-content">
          {image && imageSrc && (
            <img
              src={imageSrc}
              alt={`Image for choice ${index}`}
              className="output-choice-image"
            />
          )}
          <div className="text">{text}</div>
        </div>
        <CFormCheck checked={checkedAnswer === index - 1} />
      </div>
    )
  );
}
