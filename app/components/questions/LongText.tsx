import { CForm, CFormTextarea, CButton } from "@coreui/react";
import { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const { survey_id, question_id } = useParams();
  const surveyId = Array.isArray(survey_id) ? survey_id[0] : survey_id;
  const questionId = Array.isArray(question_id) ? question_id[0] : question_id;

  const handleQuestionChange = () => {
    if (questionRef.current) {
      adjustHeight(questionRef.current);
    }
    setQuestion(questionRef.current?.value || "");
  };

  const handleAnswerChange = () => {
    if (answerRef.current) {
      adjustHeight(answerRef.current);
    }
    setAnswer(answerRef.current ? answerRef.current.value : "");
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
      <div className="action-btn">
        <CButton
          type="button"
          variant="outline"
          className="confirm"
        >
          ذخیره
        </CButton>
        <CButton
          type="button"
          variant="outline"
          className="cancel"
        >
          انصراف
        </CButton>
      </div>
    </CForm>
  );
}
