"use client";

import postResponse from "@/app/api/postResponse";
import ShortTextOutput from "@/app/components/questions/ShortText/Output";
import LongTextOutput from "@/app/components/questions/LongText/Output";
import MultipleChoiceOutput from "@/app/components/questions/MultipleChoice/Output";
import PsychologyOutput from "@/app/components/questions/Psychology/Output";
import { CButton, CProgress, CSpinner } from "@coreui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import getPublicExamAllQuestions, {
  Question,
} from "@/app/api/getPublicExamAllQuestions";
import "./page.css";
import postAnswer from "@/app/api/postAnswer";
import getPublicExamSession, {
  ExamSession,
} from "@/app/api/getPublicExamSession";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [examSession, setExamSession] = useState<ExamSession>();
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examEnded, setExamEnded] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [answerText, setAnswer] = useState("");
  const [optionId, setOptionId] = useState<number>();
  const { exam_session_id } = useParams();
  const examSessionId = Array.isArray(exam_session_id)
    ? exam_session_id[0]
    : exam_session_id;
  const [questionTime, setQuestionTime] = useState<number>(0);
  const [examTime, setExamTime] = useState<number>(0);
  const [incomingPage, setIncomingPage] = useState<Question | undefined>();
  const [endingPage, setEndigPage] = useState<Question | undefined>();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const exam = await getPublicExamSession({
          exam_session_id: examSessionId,
        });
        if (typeof exam !== "number") {
          setExamSession(exam);
        } else {
          setError("خطا در دریافت آزمون");
          return;
        }
        const startTime = new Date().toISOString();
        const status = await postResponse({
          exam_session_id: examSessionId,
          startTime: startTime,
        });
        if (status !== 200) {
          if (status === 400) {
            return;
          }
          setError("خطا در ساخت پاسخنامه");
          return;
        }
      } catch (e) {
      } finally {
        const response = await getPublicExamAllQuestions({
          exam_session_id: examSessionId,
        });
        setLoading(true);
        if (Array.isArray(response)) {
          const sorted = response?.sort((a, b) => a.order - b.order);
          if (sorted && sorted[0]?.questionType === "ENDING")
            setEndigPage(sorted.shift());
          if (sorted && sorted[0]?.questionType === "OPENING")
            setIncomingPage(sorted.shift());
          setQuestions(sorted);
          console.log(sorted);
          console.log(incomingPage);
        } else {
          setError("خطا در دریافت سوالات");
          return;
        }
        setExamStarted(true);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [examSessionId]);

  useEffect(() => {
    setQuestionTime(
      examSession?.timerOnQuestion
        ? (examSession.duration * 60) / questions.length
        : 0
    );
    setExamTime((examSession?.duration || 0) * 60);
    setTimeRemaining(examSession?.timerOnQuestion ? questionTime : examTime);
    console.log(questionTime);
  }, [examSession, questions]);

  useEffect(() => {
    if (!examStarted && !loading && questions.length > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            handleConfirm();
            return examSession?.timerOnQuestion ? questionTime : 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, questions, index, examStarted]);

  const handleNextQuestion = () => {
    setAnswer("");
    setOptionId(undefined);
    if (index < questions.length - 1) {
      setIndex(index + 1);
      console.log("mksamcas", questionTime);
      if (examSession?.timerOnQuestion) setTimeRemaining(questionTime);
    } else setExamEnded(true);
  };

  const handleConfirm = () => {
    postAnswer({
      questionId: currentQuestion.id,
      optionId: optionId,
      answerText: answerText,
      exam_session_id: examSessionId,
    });
    handleNextQuestion();
  };

  const currentQuestion = questions[index];

  const output = () => {
    switch (currentQuestion?.questionType) {
      case "SHORT_TEXT":
        return (
          <ShortTextOutput
            index={index + 1}
            question={currentQuestion.questionText}
            setAnswer={setAnswer}
            image={currentQuestion.image}
          />
        );
      case "LONG_TEXT":
        return (
          <LongTextOutput
            index={index + 1}
            question={currentQuestion.questionText}
            setAnswer={setAnswer}
            image={currentQuestion.image}
          />
        );
      case "MULTIPLE_CHOICE":
        return (
          <MultipleChoiceOutput
            index={index + 1}
            options={currentQuestion.options}
            question={currentQuestion.questionText}
            image={currentQuestion.image}
            setOptionId={setOptionId}
          />
        );
      case "PSYCHOLOGY":
        return (
          <PsychologyOutput
            index={index + 1}
            options={currentQuestion.options}
            question={currentQuestion.questionText}
            setOptionId={setOptionId}
            image={currentQuestion.image}
          />
        );

      default:
        return <div>error</div>;
    }
  };

  return error !== "" ? (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <FaExclamationTriangle className="text-red-600 text-6xl" />
      <div className="text-2xl font-semibold text-center">{error}</div>
      <div className="text-lg text-center">لطفا مجددا تلاش کنید</div>
      <div className="flex gap-4">
        <CButton
          variant="outline"
          type="button"
          onClick={() => {
            location.reload();
          }}
          className="return-btn px-4 py-2 rounded-lg"
        >
          تلاش مجدد
        </CButton>
        <CButton
          variant="outline"
          type="button"
          href="/dashboard"
          className="dashboard-btn px-4 py-2 rounded-lg"
        >
          بازگشت به داشبورد
        </CButton>
      </div>
    </div>
  ) : loading ? (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <CSpinner variant="grow" />
      <div className="text-lg">لطفا چند لحظه منتظر بمانید</div>
    </div>
  ) : examStarted ? (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <div className="text-3xl font-bold">
        {incomingPage && incomingPage.questionText ? (
          <div
            dangerouslySetInnerHTML={{ __html: incomingPage.questionText }}
          />
        ) : (
          "آماده‌اید؟"
        )}
      </div>
      <div className="text-lg text-center">{examSession?.exam.title}</div>
      <div className="text-md text-center">{examSession?.exam.description}</div>
      <div className="text-md">
        مدت زمان آزمون: {examSession?.duration} دقیقه
      </div>
      <CButton
        onClick={() => setExamStarted(false)}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        شروع آزمون
      </CButton>
    </div>
  ) : examEnded || questions.length === 0 ? (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <div className="text-3xl font-bold">
        {endingPage && endingPage.questionText ? (
          <div dangerouslySetInnerHTML={{ __html: endingPage.questionText }} />
        ) : (
          "آزمون پایان یافت"
        )}
      </div>

      <CButton
        type="button"
        href="/dashboard"
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        بازگشت به داشبورد
      </CButton>
    </div>
  ) : (
    <div>
      <div className="absolute top-8 left-8 text-xl border-2 p-2 border-solid border-black rounded bg-[#D1D5DB] ">
        {Math.floor(timeRemaining / 3600).toLocaleString("fa-IR", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        :
        {(Math.floor(timeRemaining / 60) % 60).toLocaleString("fa-IR", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        :
        {(timeRemaining % 60).toLocaleString("fa-IR", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </div>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        {output()}
      </div>
      <div className="w-full h-12 bg-[#D1D5DB] absolute bottom-0 flex flex-row justify-between items-center px-6">
        <div className="flex gap-3">
          <CButton
            className="bg-black text-white"
            onClick={handleConfirm}
          >
            {index === questions.length - 1 ? "پایان آزمون" : "سوال بعد"}
          </CButton>
          <div className="flex flex-col gap-1">
            {Math.floor((index * 100) / questions.length)}% پاسخ داده‌اید
            <div className="w-44">
              <CProgress
                animated
                color="black"
                value={Math.floor((index * 100) / questions.length)}
              />
            </div>
          </div>
        </div>
        <CButton
          variant="outline"
          type="button"
          href="/dashboard"
          className="bg-black text-white"
        >
          بازگشت به داشبورد
        </CButton>
      </div>
    </div>
  );
}
