import { useEffect, useRef } from "react";
import axios from "axios";
import { CButton, CFormInput } from "@coreui/react";
import "./Choice.css";
import postImage from "@/app/api/postImage";

interface InputProps {
  index: number;
  setText: Function;
  text: string;
  image?: string;
  setImage: Function;
  handleDelete: Function;
  length: number;
  CorrectOption?: number;
  setCorrectOption: Function;
}

export default function Choice({
  index,
  setText,
  text,
  image,
  setImage,
  handleDelete,
  length,
  CorrectOption,
  setCorrectOption,
}: InputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (image) {
      setImage(undefined);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      postImage(file, setImage);
    }
  };

  useEffect(() => {
    console.log(image);
  }, [image]);

  return (
    <div className="choice">
      <div
        className={`index hover:cursor-pointer ${
          CorrectOption === index && "bg-green"
        }`}
        onClick={() => {
          setCorrectOption(index);
        }}
      >
        {CorrectOption === index ? (
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
      <CFormInput
        value={text}
        placeholder={`گزینه ${index}`}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center justify-start">
        <CButton
          className="m-0 p-1"
          variant="ghost"
          type="button"
          onClick={handleButtonClick} // Trigger file input click
        >
          {image ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 48 48"
            >
              <g fill="none">
                <path
                  fill="currentColor"
                  d="M44 23.994a2 2 0 0 0-4 0zm-20-16a2 2 0 1 0 0-4zm15 32H9v4h30zm-31-1v-30H4v30zm32-15v15h4v-15zm-31-16h15v-4H9zm0 32a1 1 0 0 1-1-1H4a5 5 0 0 0 5 5zm30 4a5 5 0 0 0 5-5h-4a1 1 0 0 1-1 1zm-31-35a1 1 0 0 1 1-1v-4a5 5 0 0 0-5 5z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="m6 35l10.693-9.802a2 2 0 0 1 2.653-.044L32 36m-4-5l4.773-4.773a2 2 0 0 1 2.615-.186L42 31M33 7l8 8m0-8l-8 8"
                ></path>
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 48 48"
            >
              <g fill="none">
                <path
                  fill="currentColor"
                  d="M44 24a2 2 0 1 0-4 0zM24 8a2 2 0 1 0 0-4zm15 32H9v4h30zM8 39V9H4v30zm32-15v15h4V24zM9 8h15V4H9zm0 32a1 1 0 0 1-1-1H4a5 5 0 0 0 5 5zm30 4a5 5 0 0 0 5-5h-4a1 1 0 0 1-1 1zM8 9a1 1 0 0 1 1-1V4a5 5 0 0 0-5 5z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="m6 35l10.693-9.802a2 2 0 0 1 2.653-.044L32 36m-4-5l4.773-4.773a2 2 0 0 1 2.615-.186L42 31M30 12h12m-6-6v12"
                ></path>
              </g>
            </svg>
          )}
        </CButton>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange} // Handle file input change
          style={{ display: "none" }} // Hide the actual file input
        />
        <CButton
          className={`m-0 p-1 pl-3 ${length < 3 && "disable"}`}
          variant="ghost"
          type="button"
          onClick={(e) => handleDelete()}
          disabled={length < 3}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
            ></path>
          </svg>
        </CButton>
      </div>
    </div>
  );
}
