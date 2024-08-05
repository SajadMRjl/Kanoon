"use client";

import QuestionBar from "@/app/components/questions/QuestionBar";
import TypeSelector from "@/app/components/questions/TypeSelector";

import "./page.css";
import AddQuestion from "@/app/components/questions/AddQuestion";
import { useState } from "react";

export default function Page() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(1);

  return (
    <div className="main">
      <div className="question-type-container">
        <TypeSelector setVisible={setVisible} />
      </div>
      <div className="question-bar-container">
        <QuestionBar />
      </div>
      <AddQuestion
        visible={visible}
        setVisible={setVisible}
        index={index}
      />
    </div>
  );
}
