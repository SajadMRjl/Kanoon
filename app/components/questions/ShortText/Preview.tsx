import { CFormInput } from "@coreui/react";
import { useEffect, useState } from "react";

interface InputProps {
  question: string;
  answer: string;
  index: number;
  image: string;
}

export default function Preview({
  question,
  answer,
  index,
  image,
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
      <div className="w-1/2">
        <CFormInput value={answer} />
      </div>
    </div>
  );
}
