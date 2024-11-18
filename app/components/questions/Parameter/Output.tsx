import { Option } from "@/app/api/getPublicExamAllQuestions";
import OutputChoice from "./OutputChoice";
import { useState, useEffect } from "react";

interface InputProps {
  question: string;
  options: Option[];
  setOptionId: (arg0: number) => void;
  index: number;
  image: string;
}

export default function Output({
  question,
  options,
  setOptionId,
  index,
  image,
}: InputProps) {
  const [checkedAnswer, setCheckedAnswer] = useState(-1);

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

  useEffect(() => {
    if (checkedAnswer !== -1) setOptionId(options[checkedAnswer].id);
  }, [checkedAnswer]);

  useEffect(() => {
    setCheckedAnswer(-1);
  }, [question]);

  return (
    <div className="h-full flex flex-col justify-center items-start">
      <div className="flex flex-row justify-between items-start w-full gap-6">
        <div className="flex gap-3 justify-center items-start mb-4">
          {index}.
          <div
            className="overflow-auto break-all"
            dangerouslySetInnerHTML={{ __html: question }}
          />
        </div>
        {image && imageSrc && (
          <img
            src={imageSrc}
            alt={`Image ${index}`}
            className="max-w-[300px] max-h-[400px]"
          />
        )}
      </div>
      <div className="flex gap-1 flex-wrap">
        {options?.map((option, index) => {
          return (
            <OutputChoice
              index={index + 1}
              text={option.optionText}
              image={option.image}
              key={index}
              checkedAnswer={checkedAnswer}
              setCheckedAnswer={setCheckedAnswer}
            />
          );
        })}
      </div>
    </div>
  );
}
