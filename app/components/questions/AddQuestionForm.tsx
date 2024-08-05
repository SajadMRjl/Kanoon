import { CCloseButton, CButton } from "@coreui/react";
import { useSearchParams, useParams } from "next/navigation";
import { questionTypes } from "./QuestionTypes";
import "./AddQuestionForm.css";
import InputForm from "./ShortText/InputForm";
import { CLoadingButton } from "@coreui/react-pro";
import { useState } from "react";
import postQuestion from "@/app/api/postQuestion";

interface InputProps {
  setVisible: Function;
  index: number;
  question: string;
  setQuestion: Function;
  answer: string;
  setAnswer: Function;
}

export default function AddQuestionForm({
  setVisible,
  index,
  question,
  setQuestion,
  answer,
  setAnswer,
}: InputProps) {
  const { survey_id } = useParams();
  const surveyId = Array.isArray(survey_id) ? survey_id[0] : survey_id;
  const params = useSearchParams();
  const questionType = params.get("type") || "";
  const questionheder = questionTypes.find((q) => q.type === questionType);

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setVisible(false);

    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  };

  const handleConfirm = async () => {
    setLoading(true);
    const respond = await postQuestion({
      survey_id: surveyId,
      questionText: question,
      questionType: "TEXT_INPUT",
      correctAnswer: answer,
      options: [],
    });
    setLoading(false);
    handleClose();
  };

  return (
    <div className="question-form">
      <div className="question-form-container">
        <div className="question-form-header">
          <CCloseButton onClick={handleClose} />
          <div className="question-type">
            {questionheder && (
              <>
                <div className="question-icon">
                  {questionheder.icon} {index}
                </div>
                <div className="question-text">{questionheder.text}</div>
              </>
            )}
          </div>
        </div>
        <InputForm
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          setAnswer={setAnswer}
        />
      </div>

      <div className="question-form-action">
        <CButton
          className="cancel-btn"
          type="button"
          variant="outline"
          onClick={handleClose}
        >
          انصراف
        </CButton>
        <CLoadingButton
          className="confirm-btn"
          type="button"
          variant="outline"
          onClick={handleConfirm}
          loading={loading}
        >
          ذخیره
        </CLoadingButton>
      </div>
    </div>
  );
}
