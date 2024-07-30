import { CButton, CFormInput } from "@coreui/react";
import "./Choice.css";

interface InputProps {
  index: number;
  setText: Function;
  text: string;
  hadleDelete: Function;
}

export default function Choice({
  index,
  setText,
  text,
  hadleDelete,
}: InputProps) {
  return (
    <div className="choice">
      <div className="index">{index}</div>
      <CFormInput
        value={text}
        placeholder={`گزینه ${index}`}
        onChange={(e) => setText(e.target.value)}
      />
      <CButton
        variant="ghost"
        type="button"
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
