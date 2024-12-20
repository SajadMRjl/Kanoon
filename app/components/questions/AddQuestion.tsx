import { CModal, CModalBody } from "@coreui/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./AddQuestion.css";
import AddQuestionForm from "./AddQuestionForm";
import ShortTextOutput from "./ShortText/Preview";
import LongTextOutput from "./LongText/Preview";
import MultipleChoiceOutput from "./MultipleChoice/Preview";
import PsychologyOutput from "./Psychology/Preview";
import ParameterOutput from "./Parameter/Preview";
import OpeningOutput from "./IncomingPage/Preview";
import EndingOutPut from "./EndingPage/Preview";
import { Option } from "@/app/api/getQuestion";
import getQuestion, { QuestionType } from "@/app/api/getQuestion";

interface InputProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  index: number;
  setRefreshQuestions: (refresh: boolean) => void;
}

export default function AddQuestion({
  visible,
  setVisible,
  index,
  setRefreshQuestions,
}: InputProps) {
  const { survey_id } = useParams();
  const surveyId = Array.isArray(survey_id) ? survey_id[0] : survey_id;

  const params = useSearchParams();
  const questionType = params.get("type") || "";
  const questionAction = params.get("action") || "";
  const question_id = params.get("id") || "";

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [correctOption, setCorrectOption] = useState<number>();
  const [order, setOrder] = useState<number>();
  const [point, setPoint] = useState<number>();
  const [options, setOptions] = useState<Option[]>([
    {
      optionText: "",
      questionId: Number(question_id),
      factorImpacts: [],
      order: 1,
      image: "",
    },
    {
      optionText: "",
      questionId: Number(question_id),
      factorImpacts: [],
      order: 2,
      image: "",
    },
  ]);

  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      if (questionAction === "edit" && surveyId && question_id) {
        const response = await getQuestion({
          survey_id: surveyId,
          question_id: question_id,
        });

        if (typeof response !== "number") {
          setQuestion(response.questionText);
          setAnswer(response.correctAnswer || "");
          setOptions(response.options);
          setCorrectOption(response.correctOption);
          setOrder(response.order);
          setPoint(response.point);
          setImage(response.image || "");
        } else {
        }
      }
    };

    fetchQuestion();
  }, [questionAction, surveyId, question_id]);

  const output = () => {
    switch (questionType) {
      case "SHORT_TEXT":
        return (
          <ShortTextOutput
            question={question}
            answer={answer}
            index={order || index}
            image={image}
          />
        );
      case "LONG_TEXT":
        return (
          <LongTextOutput
            question={question}
            answer={answer}
            image={image}
            index={order || index}
          />
        );
      case "MULTIPLE_CHOICE":
        return (
          <MultipleChoiceOutput
            image={image}
            question={question}
            options={options}
            index={order || index}
          />
        );
      case "PSYCHOLOGY":
        return (
          <PsychologyOutput
            image={image}
            question={question}
            options={options}
            index={order || index}
          />
        );
      case "PARAMETER":
        return (
          <ParameterOutput
            image={image}
            question={question}
            options={options}
            index={order || index}
          />
        );
      case "OPENING":
        return <OpeningOutput question={question} />;
      case "ENDING":
        return <EndingOutPut question={question} />;
      default:
        return null;
    }
  };

  const handleClose = () => {
    setQuestion("");
    setAnswer("");
    setOptions([
      {
        optionText: "",
        questionId: Number(question_id),
        factorImpacts: [],
        order: 1,
        image: "",
      },
      {
        optionText: "",
        questionId: Number(question_id),
        factorImpacts: [],
        order: 2,
        image: "",
      },
    ]);
    setOrder(undefined);
    setPoint(undefined);
    setImage("");
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState(null, "", newUrl);
    setVisible(false);
  };

  return (
    <CModal
      className="add-question-modal"
      visible={visible}
      onClose={handleClose}
      focus
      keyboard
    >
      <CModalBody>
        <div className="question-input-form">
          <AddQuestionForm
            setVisible={setVisible}
            index={order || index}
            question={question}
            setQuestion={setQuestion}
            answer={answer}
            correctOption={correctOption}
            setCorrectOption={setCorrectOption}
            setAnswer={setAnswer}
            options={options}
            setOptions={setOptions}
            point={point}
            setPoint={setPoint}
            setRefreshQuestions={setRefreshQuestions}
            image={image}
            setImage={setImage}
          />
        </div>
        <div className="question-preview">{output()}</div>
      </CModalBody>
    </CModal>
  );
}
