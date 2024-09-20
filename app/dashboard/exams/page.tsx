"use client";

import getAllPublicExamSeesions, {
  ExamSession,
  Exam,
} from "@/app/api/getAllPublicExamSessions";
import Quiz from "@/app/components/dashboard/Exam";
import { CTabs, CTabList, CTab, CTabPanel, CSpinner } from "@coreui/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [Exams, setExams] = useState<ExamSession[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      const response = await getAllPublicExamSeesions();
      if (Array.isArray(response)) {
        setExams(response);
      }
      setLoading(false);
    };

    fetchExams();
  }, []);

  return (
    <div>
      <h2 className="mb-4">آزمون ها</h2>
      <CTabs activeItemKey={1}>
        <CTabList variant="underline-border">
          <CTab itemKey={1}>عمومی</CTab>
          <CTab itemKey={2}>خصوصی</CTab>
          <CTab itemKey={3}>پیشنهادی</CTab>
        </CTabList>
        <CTabPanel
          transition
          className="py-3 "
          itemKey={1}
        >
          {loading ? (
            <div className="flex items-center justify-center w-full mt-8">
              <CSpinner />
            </div>
          ) : (
            <div className="overflow-x-scroll w-full h-full">
              {Exams.map((examSession) => {
                return (
                  <Quiz
                    key={examSession.id}
                    description={examSession.exam.description}
                    title={examSession.exam.title}
                    id={examSession.id}
                  />
                );
              })}
            </div>
          )}
        </CTabPanel>
      </CTabs>
    </div>
  );
}
