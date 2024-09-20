"use client";

import QuestionBar from "@/app/components/questions/QuestionBar";
import TypeSelector from "@/app/components/questions/TypeSelector";

import "./page.css";
import AddQuestion from "@/app/components/questions/AddQuestion";
import { useEffect, useState } from "react";

export default function Page() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(1);
  const [refreshQuestions, setRefreshQuestions] = useState(true);
  useEffect(() => {
    console.log(index);
  }, [index]);

  return (
    <div className="main">
      <div className="question-type-container">
        <TypeSelector setVisible={setVisible} />
      </div>
      
      <div className="question-bar-container">
        <QuestionBar
          setVisible={setVisible}
          setIndex={setIndex}
          refresh={refreshQuestions}
          setRefreshQuestions={setRefreshQuestions}
        />
      </div>
      <AddQuestion
        visible={visible}
        setVisible={setVisible}
        index={index}
        setRefreshQuestions={setRefreshQuestions}
      />
    </div>
  );
}
