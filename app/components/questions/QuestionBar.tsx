import { CButton } from "@coreui/react";
import "./QuestionBar.css";
import AddQuestion from "./AddQuestion";
import Question from "./Question";
import { useState, useEffect } from "react";
import getAllQuestion, { QuestionType } from "@/app/api/getAllQuestons";
import { useParams } from "next/navigation";

export default function QuestionBar() {
  const [questions, setQuestion] = useState<QuestionType[] | null>(null);

  const { survey_id } = useParams();
  const surveyId = Array.isArray(survey_id) ? survey_id[0] : survey_id;

  useEffect(() => {
    async function fetchQuestions() {
      const response = await getAllQuestion({ survey_id: surveyId });
      if (typeof response === "number") {
        console.log("error");
      } else {
        console.log(response);
        setQuestion(response);
      }
    }

    fetchQuestions();
  }, [survey_id]);

  return (
    <div className="question-bar">
      <CButton
        type="button"
        variant="outline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M20 12a1 1 0 0 0-1-1h-7.59l2.3-2.29a1 1 0 1 0-1.42-1.42l-4 4a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l4 4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L11.41 13H19a1 1 0 0 0 1-1M17 2H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3a1 1 0 0 0-2 0v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3a1 1 0 0 0 2 0V5a3 3 0 0 0-3-3"
          ></path>
        </svg>
        صفحه خوش آمدگویی
      </CButton>
      <hr className="line" />
      <div className="questions">
        {questions &&
          questions?.map((question, index) => {
            return (
              <Question
                key={question.id}
                index={index + 1}
                text={question.questionType}
                hadleDelete={() => {}}
                id={question.id}
              />
            );
          })}
      </div>
      <AddQuestion />
      <hr className="line" />
      <CButton
        type="button"
        variant="outline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M320 176v-40a40 40 0 0 0-40-40H88a40 40 0 0 0-40 40v240a40 40 0 0 0 40 40h192a40 40 0 0 0 40-40v-40m64-160l80 80l-80 80m-193-80h273"
          ></path>
        </svg>
        صفحه خروج
      </CButton>
    </div>
  );
}
