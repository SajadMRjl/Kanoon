import { CForm, CFormTextarea } from "@coreui/react";
import { useRef } from "react";
import "./ShortText.css";

interface InputProps {
  index: number;
}

function adjustHeight(el: HTMLTextAreaElement) {
  el.style.height = "auto"; // Reset height to calculate new height
  el.style.height =
    el.scrollHeight > 110 ? "115px" : el.scrollHeight + 5 + "px"; // Set the height to the scroll height
}

export default function LongText({ index }: InputProps) {
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  const handleQuestionChange = () => {
    if (questionRef.current) {
      adjustHeight(questionRef.current);
    }
  };

  const handleAnswerChange = () => {
    if (answerRef.current) {
      adjustHeight(answerRef.current);
    }
  };

  return (
    <CForm className="text-form">
      <div className="question">
        {index}.
        <CFormTextarea
          ref={questionRef}
          placeholder="متن سوال"
          onKeyUp={handleQuestionChange}
          onChange={handleQuestionChange}
        />
      </div>
      <CFormTextarea
        ref={answerRef}
        className="answer"
        placeholder="پاسخ صحیح"
        onKeyUp={handleAnswerChange}
        onChange={handleAnswerChange}
      />
    </CForm>
  );
}
