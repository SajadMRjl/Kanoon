import { CCloseButton, CButton } from "@coreui/react";
import { useSearchParams, useParams } from "next/navigation";
import { questionTypes } from "./QuestionTypes";
import "./AddQuestionForm.css";
import ShortTextInput from "./ShortText/InputForm";
import LongTextInput from "./LongText/InputForm";
import MultipleChoiceInput from "./MultipleChoice/InputForm";
import PsychologyInput from "./Psychology/InputForm";
import OpeningInput from "./IncomingPage/InputForm";
import { CLoadingButton } from "@coreui/react-pro";
import { useEffect, useState } from "react";
import postQuestion from "@/app/api/postQuestion";
import putQuestion from "@/app/api/putQuestion";
import { Option } from "@/app/api/getQuestion";

interface InputProps {
  setVisible: Function;
  index: number;
  question: string;
  setQuestion: Function;
  answer: string;
  setAnswer: Function;
  correctOption?: number;
  setCorrectOption: Function;
  options: Option[];
  setOptions: Function;
  point?: number;
  setPoint: Function;
  setRefreshQuestions: Function;
}

export default function AddQuestionForm({
  setVisible,
  index,
  question,
  setQuestion,
  answer,
  setAnswer,
  correctOption,
  setCorrectOption,
  options,
  setOptions,
  point,
  setPoint,
  setRefreshQuestions,
}: InputProps) {
  const { survey_id } = useParams();
  const surveyId = Array.isArray(survey_id) ? survey_id[0] : survey_id;

  const params = useSearchParams();
  const questionType = params.get("type") || "";
  const questionheder = questionTypes.find((q) => q.type === questionType);
  const questionAction = params.get("action") || "";
  const question_id = params.get("id") || "";

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setQuestion("");
    setAnswer("");
    setPoint(undefined);
    setCorrectOption(undefined);
    setOptions([
      {
        optionText: "",
        questionId: question_id,
        factorImpacts: [],
        order: 1,
        image: "",
      },
      {
        optionText: "",
        questionId: question_id,
        factorImpacts: [],
        order: 2,
        image: "",
      },
    ]);
    setVisible(false);

    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  };

  const handleConfirm = async () => {
    setLoading(true);

    const filteredOptions = options.filter((item) => item.optionText !== "");

    const adjustedOptions = filteredOptions.map((option) => {
      if (questionAction === "create") {
        const { id, ...rest } = option;
        return rest;
      }
      return option;
    });

    let respond;

    if (questionAction === "create") {
      respond = await postQuestion({
        survey_id: surveyId,
        questionText: question,
        questionType: questionType,
        order: questionType === "OPENING" ? 0 : index + 1,
        correctOption: correctOption,
        correctAnswer: answer,
        point: point,
        options: adjustedOptions,
      });
    } else {
      respond = await putQuestion({
        question_id: question_id,
        survey_id: surveyId,
        question: {
          id: Number(question_id),
          questionText: question,
          questionType: questionType,
          order: questionType === "OPENING" ? 0 : index + 1,
          correctAnswer: answer,
          options: adjustedOptions,
          correctOption: correctOption,
          point: point,
        },
      });
    }

    setRefreshQuestions(true);
    setLoading(false);
    handleClose();
  };
  const questionForm = () => {
    switch (questionType) {
      case "SHORT_TEXT":
        return (
          <ShortTextInput
            question={question}
            answer={answer}
            setQuestion={setQuestion}
            setAnswer={setAnswer}
            point={point}
            setPoint={setPoint}
          />
        );
      case "LONG_TEXT":
        return (
          <LongTextInput
            question={question}
            answer={answer}
            setQuestion={setQuestion}
            setAnswer={setAnswer}
            point={point}
            setPoint={setPoint}
          />
        );

      case "MULTIPLE_CHOICE":
        return (
          <MultipleChoiceInput
            question={question}
            setQuestion={setQuestion}
            correctOption={correctOption}
            setCorrectOption={setCorrectOption}
            options={options}
            setOptions={setOptions}
            point={point}
            setPoint={setPoint}
          />
        );

      case "PSYCHOLOGY":
        return (
          <PsychologyInput
            question={question}
            answer={answer}
            setQuestion={setQuestion}
            setAnswer={setAnswer}
            options={options}
            setOptions={setOptions}
          />
        );
      case "OPENING":
        return (
          <OpeningInput
            question={question}
            setQuestion={setQuestion}
          />
        );
      default:
        return "error";
    }
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
                  {questionheder.icon}
                  {questionType !== "ENDING" &&
                    questionType !== "OPENING" &&
                    index}
                </div>
                <div className="question-text">{questionheder.text}</div>
              </>
            )}
          </div>
        </div>
        <div className="question-input">{questionForm()}</div>
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
