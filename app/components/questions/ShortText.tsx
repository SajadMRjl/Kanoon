import { CButton, CForm, CFormInput, CFormTextarea } from "@coreui/react";
import { useRef, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "./ShortText.css";
import getQuestion from "@/app/api/getQuestion";
import postQuestion from "@/app/api/postQuestion";

interface InputProps {
  index: number;
  questin_id?: number;
}

function adjustHeight(el: HTMLTextAreaElement) {
  el.style.height = "auto"; // Reset height to calculate new height
  el.style.height =
    el.scrollHeight > 110 ? "115px" : el.scrollHeight + 5 + "px"; // Set the height to the scroll height with a max limit
}

export default function ShortText({ index }: InputProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<number | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { survey_id, question_id } = useParams();
  const surveyId = Array.isArray(survey_id) ? survey_id[0] : survey_id;
  const questionId = Array.isArray(question_id) ? question_id[0] : question_id;

  const handleTextAreaChange = () => {
    if (textareaRef.current) {
      adjustHeight(textareaRef.current);
    }
    setQuestion(textareaRef.current?.value || "");
  };

  const handleAnswerChange = () => {
    setAnswer(inputRef.current ? inputRef.current.value : "");
  };

  useEffect(() => {
    async function fetchQuestion() {
      const result = await getQuestion({ survey_id: surveyId, question_id: questionId });
      if (typeof result === "number") {
        setError(result);
      } else {
        console.log(result);
        setQuestion(result.questionText);
        setAnswer(result.correctAnswer);
      }
    }
    if (question_id !== "add") fetchQuestion();
    if (textareaRef.current) {
      adjustHeight(textareaRef.current);
    }
  }, [survey_id, question_id]);

  const handleSubmit = () => {
    async function sendQuestion() {
      const id = await postQuestion({
        survey_id: surveyId,
        questionText: question,
        questionType: "short-text",
        correctAnswer: answer,
        options: [],
      });
      if (id !== -1) {
        router.replace(`./survey/${survey_id}/questions/${id}/short-text`);
      } else {
        console.log("error");
      }
    }
    sendQuestion();
  };

  return (
    <CForm className="text-form">
      <div className="question">
        {index}.
        <CFormTextarea
          ref={textareaRef}
          placeholder="متن سوال"
          rows={2}
          onChange={handleTextAreaChange}
          required
          value={question}
        />
      </div>
      <CFormInput
        ref={inputRef}
        className="answer"
        placeholder="پاسخ صحیح"
        onChange={handleAnswerChange}
        value={answer}
      />
      <div className="action-btn">
        <CButton
          type="button"
          variant="outline"
          className="confirm"
          onClick={handleSubmit}
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
