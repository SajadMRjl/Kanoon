import { CButton } from "@coreui/react";
import "./QuestionBar.css";
import Question from "./Question";
import { useState, useEffect, useCallback } from "react";
import getAllQuestions, { QuestionType } from "@/app/api/getAllQuestions";
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import DeleteQuestion from "./DeleteQuestion";

interface InputProps {
  setIndex: Function;
  refresh: boolean;
  setRefreshQuestions: Function;
  setVisible: Function;
}

export default function QuestionBar({
  setIndex,
  refresh,
  setRefreshQuestions,
  setVisible,
}: InputProps) {
  const [incomingPage, setIncomingPage] = useState<QuestionType | undefined>();
  const [questions, setQuestion] = useState<QuestionType[] | null>(null);
  const [sortedQuestion, setSortedQuestion] = useState<
    QuestionType[] | undefined
  >();
  const [id, setID] = useState(-1);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { survey_id } = useParams();
  const surveyId = Array.isArray(survey_id) ? survey_id[0] : survey_id;

  useEffect(() => {
    async function fetchQuestions() {
      const response = await getAllQuestions({ survey_id: surveyId });
      if (typeof response === "number") {
      } else {
        setQuestion(response);
        setIndex(response.length);
      }
      setRefreshQuestions(false);
    }

    fetchQuestions();
  }, [survey_id, refresh, deleteVisible]);

  useEffect(() => {
    const sorted = questions?.sort((a, b) => a.order - b.order);
    if (sorted && sorted[0]?.questionType === "OPENING")
      setIncomingPage(sorted.shift());
    setIndex(questions?.length ? questions?.length + 1 : 1);
    setSortedQuestion(sorted);
  }, [questions]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleClick = (e: string) => {
    router.push(
      pathname +
        "?" +
        createQueryString("type", e) +
        "&" +
        createQueryString("action", "create")
    );
    setVisible(true);
  };

  return (
    <div className="question-bar overflow-y-scroll ">
      {incomingPage ? (
        <Question
          key={incomingPage.id}
          text={incomingPage.questionText}
          handleDelete={(id: number) => {
            setID(id);
            setDeleteVisible(true);
          }}
          type={incomingPage.questionType}
          id={incomingPage.id}
          setVisible={setVisible}
        />
      ) : (
        <CButton
          type="button"
          variant="outline"
          onClick={() => handleClick("OPENING")}
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
      )}
      <div className="questions">
        {sortedQuestion &&
          sortedQuestion?.map((question, index) => {
            return (
              <Question
                key={question.id}
                index={index + 1}
                text={question.questionText}
                handleDelete={(id: number) => {
                  setID(id);
                  setDeleteVisible(true);
                }}
                type={question.questionType}
                id={question.id}
                setVisible={setVisible}
              />
            );
          })}
      </div>
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
      <DeleteQuestion
        visible={deleteVisible}
        setVisible={setDeleteVisible}
        id={id}
      />
    </div>
  );
}
