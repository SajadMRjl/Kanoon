import { useEffect, useState } from "react";
import "./OutputChoice.css";

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

        setImageSrc(imageObjectURL);
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
        <div className="output-content">
          {image && imageSrc && (
            <img
              src={imageSrc}
              alt={`Image for choice ${index}`}
              className="output-choice-image"
            />
          )}
          <div className="flex items-center justify-start w-full">
            <div className="index hover:cursor-pointer">
              {checkedAnswer === index - 1 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.39 1.39 0 0 1 .27-1.951a1.39 1.39 0 0 1 1.953.27l2.351 3.104l5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656z"
                  ></path>
                </svg>
              ) : (
                index
              )}
            </div>
            <div>{text}</div>
          </div>
        </div>
      </div>
    )
  );
}
