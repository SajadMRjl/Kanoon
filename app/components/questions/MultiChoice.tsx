import { CForm, CFormInput, CFormTextarea } from "@coreui/react";
import { useRef, useEffect } from "react";

import "./MultiChoice.css";
import Choice from "./Choice";

interface InputProps {
  index: number;
}

function adjustHeight(el: HTMLTextAreaElement) {
  el.style.height = "auto";
  el.style.height =
    el.scrollHeight > 110 ? "115px" : el.scrollHeight + 5 + "px";
}

export default function MultiChoice({ index }: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextAreaChange = () => {
    if (textareaRef.current) {
      adjustHeight(textareaRef.current);
    }
  };

  useEffect(() => {
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
      <div className="choices">
        <Choice
          index={1}
          hadleDelete={() => {}}
          setText={() => {}}
          text=""
        />
        <Choice
          index={2}
          hadleDelete={() => {}}
          setText={() => {}}
          text=""
        />
        <Choice
          index={3}
          hadleDelete={() => {}}
          setText={() => {}}
          text=""
        />
      </div>
    </CForm>
  );
}
