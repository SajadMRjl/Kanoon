"use client";

import ExamTable from "@/app/components/admin/exam/ExamTable";
import "./page.css";
import { CButton } from "@coreui/react";
import { useState } from "react";
import { CTabs, CTabList, CTab, CTabContent, CTabPanel } from "@coreui/react";
import AddExam from "@/app/components/admin/exam/AddExam";

export default function Page() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(true);

  return (
    <div className="page">
      <div className="w-full">
        <h2 className="page-header">آزمون ها</h2>
        <CTabs activeItemKey={1}>
          <CTabList variant="underline-border">
            <CTab itemKey={1}>فعال</CTab>
            <CTab itemKey={2}>غیرفعال</CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel
              transition
              className="py-3"
              itemKey={1}
              onShow={() => {
                setActive(true);
              }}
            >
              <ExamTable
                newVisible={visible}
                active={active}
              />
            </CTabPanel>
            <CTabPanel
              transition
              className="py-3"
              itemKey={2}
              onShow={() => {
                setActive(false);
              }}
            >
              <ExamTable
                newVisible={visible}
                active={active}
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
        افزودن آزمون
      </CButton>
      <AddExam
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
}
