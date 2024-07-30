"use client";
import "./layout.css";

import QuestionBar from "@/app/components/questions/QuestionBar";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { survey_id } = useParams();
  return (
    <div className="main">
      <div className="question-bar">
        <QuestionBar />
      </div>
      <div className="preview">{children}</div>
    </div>
  );
}
