import { CForm, CFormInput, CFormTextarea } from "@coreui/react";
import { useRef, useEffect } from "react";
import "./ShortText.css";

interface InputProps {
  index: number;
}

function adjustHeight(el: HTMLTextAreaElement) {
  el.style.height = "auto"; // Reset height to calculate new height
  el.style.height =
    el.scrollHeight > 110 ? "115px" : el.scrollHeight + 5 + "px"; // Set the height to the scroll height with a max limit
}

export default function ShortText({ index }: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextAreaChange = () => {
    if (textareaRef.current) {
      adjustHeight(textareaRef.current);
    }
  };

  useEffect(() => {
    // Initialize height adjustment on mount
    if (textareaRef.current) {
      adjustHeight(textareaRef.current);
    }
  }, []);

  return (
    <CForm className="text-form">
      <div className="question">
        {index}.
        <CFormTextarea
          ref={textareaRef}
          placeholder="متن سوال"
          rows={2}
          onChange={handleTextAreaChange}
        />
      </div>
      <CFormInput
        className="answer"
        placeholder="پاسخ صحیح"
      />
    </CForm>
  );
}
