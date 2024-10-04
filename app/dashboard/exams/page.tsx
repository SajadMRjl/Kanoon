"use client";

import getAllPublicExamSeesions, {
  ExamSession,
} from "@/app/api/getAllPublicExamSessions";
import Quiz from "@/app/components/dashboard/Exam";
import { CTabPanel, CSpinner } from "@coreui/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [Exams, setExams] = useState<ExamSession[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      const response = await getAllPublicExamSeesions();
      if (Array.isArray(response)) {
        // const sorted = response.sort((a, b) => )
        setExams(response);
      }
      setLoading(false);
    };

    fetchExams();
  }, []);

  return (
    <div>
      <h2 className="mb-8">آزمون ها</h2>

      {loading ? (
        <div className="flex items-center justify-center w-full mt-8">
          <CSpinner />
        </div>
      ) : (
        <div className="overflow-y-auto w-full h-full">
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
    </div>
  );
}
