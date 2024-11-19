"use client";

import {
  CTabs,
  CTabList,
  CTab,
  CTabPanel,
  CSpinner,
  CButton,
  CTabContent,
} from "@coreui/react";
import { useState } from "react";

import "./page.css";
import AddExamSession from "@/app/components/admin/exam-survey/addExamSurvey";
import ExamSessionTable from "@/app/components/admin/exam-survey/ExamSessionTable";

export default function Page() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className="exam-container">
      <div className="w-full">
        <h2 className="mb-4">مدیریت برگزاری آزمون </h2>
        <CTabs activeItemKey={1}>
          <CTabList variant="underline-border">
            <CTab itemKey={1}>درحال برگزاری</CTab>
            <CTab itemKey={2}>پایان یافته</CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel
              transition
              className="py-3"
              itemKey={1}
            >
              <ExamSessionTable
                previous={false}
                newVisible={visible}
              />
            </CTabPanel>
            <CTabPanel
              transition
              className="py-3"
              itemKey={2}
            >
              <ExamSessionTable
                previous={true}
                newVisible={visible}
              />
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </div>
      <CButton
        className="add-exam-btn"
        type="button"
        color="secondary"
        onClick={() => setVisible(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <circle
              cx={12}
              cy={12}
              r={10}
            ></circle>
            <path
              strokeLinecap="round"
              d="M15 12h-3m0 0H9m3 0V9m0 3v3"
            ></path>
          </g>
        </svg>
        برگزاری آزمون جدید
      </CButton>
      <AddExamSession
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
}
