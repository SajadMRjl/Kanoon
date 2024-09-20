import { CButton, CButtonGroup, CFormInput } from "@coreui/react";
import "./Choice.css";

interface InputProps {
  index: number;
  setText: Function;
  text: string;
  handleDelete: Function;
  length: number;
  CorrectOption?: number;
  setCorrectOption: Function;
}

export default function Choice({
  index,
  setText,
  text,
  handleDelete,
  length,
  CorrectOption,
  setCorrectOption,
}: InputProps) {
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
      <CButton
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
  );
}
