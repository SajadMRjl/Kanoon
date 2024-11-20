"use client";

import React, { useEffect, useState } from "react";
import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";
import getAllUser from "@/app/api/getAllUser";
import GaugeChart from "./gaugeChart";
import getAllExams from "@/app/api/getAllExams";
import getSurveyList from "@/app/api/getSurveyList";

export default function Page() {
  const [userCount, setUserCount] = useState<number>(0);
  const [examCount, setExamCount] = useState<number>(0);
  const [surveyCount, setSurveyCount] = useState<number>(0);

  // Fetch user count from the API
  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUser();
      if (Array.isArray(users)) {
        setUserCount(users.length); // Set user count
      } else {
        console.error("Failed to fetch user data:", users);
      }

      // Fetch exams
      const exams = await getAllExams();
      if (Array.isArray(exams)) {
        setExamCount(exams.length);
      } else {
        console.error("Failed to fetch exam data:", exams);
      }

      // Fetch surveys
      const surveys = await getSurveyList();
      if (Array.isArray(surveys)) {
        setSurveyCount(surveys.length);
      } else {
        console.error("Failed to fetch survey data:", surveys);
      }
    };

    fetchData();
  }, []);

  const chartData = [
    { value: userCount, label: "کاربران" }, // User count
    { value: examCount, label: "آزمون‌ها" }, // Exam count
    { value: surveyCount, label: "پرسشنامه ها" }, // Survey count
  ];

  return (
    <CRow>
      {chartData.map((data, index) => (
        <CCol
          key={index}
          xs={12}
          md={4}
        >
          <CCard>
            <CCardHeader>{data.label}</CCardHeader>
            <CCardBody>
              <GaugeChart
                value={data.value}
                label={data.label}
              />
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  );
}
