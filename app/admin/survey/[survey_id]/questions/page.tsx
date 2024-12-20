"use client";

import QuestionBar from "@/app/components/questions/QuestionBar";
import TypeSelector from "@/app/components/questions/TypeSelector";

import "./page.css";
import AddQuestion from "@/app/components/questions/AddQuestion";
import { useEffect, useState } from "react";
import { CButton } from "@coreui/react";
import ParameterModal from "@/app/components/questions/ParameterModal";
import OptionModal from "@/app/components/questions/OptoinModal";

export default function Page() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(1);
  const [refreshQuestions, setRefreshQuestions] = useState(true);
  const [parameterVisibel, setParameterVisible] = useState(false);
  const [optionVisible, setOptionVisible] = useState(false);
  useEffect(() => {
    console.log(index);
  }, [index]);

  return (
    <div className="main">
      <div className="question-type-container">
        <TypeSelector setVisible={setVisible} />
        <div className="add-parameter">
          <CButton
            color="primary"
            onClick={() => {
              setParameterVisible(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M3.38 3.012a.75.75 0 1 0-1.408-.516A16 16 0 0 0 1 8c0 1.932.343 3.786.972 5.503a.75.75 0 0 0 1.408-.516A14.5 14.5 0 0 1 2.5 8c0-1.754.311-3.434.88-4.988m9.24 0a.75.75 0 1 1 1.408-.516A16 16 0 0 1 15 8a16 16 0 0 1-.972 5.503a.75.75 0 0 1-1.408-.516c.569-1.554.88-3.233.88-4.987s-.311-3.434-.88-4.988M6.523 4.785a.75.75 0 0 1 .898.38l.758 1.515l.812-.902a2.38 2.38 0 0 1 2.486-.674a.75.75 0 1 1-.454 1.429a.88.88 0 0 0-.918.249L8.9 8.122l.734 1.468l.388-.124a.75.75 0 0 1 .457 1.428l-1 .32a.75.75 0 0 1-.899-.379L7.821 9.32l-.811.901a2.37 2.37 0 0 1-2.489.673a.75.75 0 0 1 .458-1.428a.87.87 0 0 0 .916-.248L7.1 7.878L6.366 6.41l-.389.124a.75.75 0 1 1-.454-1.43z"
              ></path>
            </svg>
            عامل ها
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              setOptionVisible(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 40 40"
            >
              <g fill="currentColor">
                <path d="M23.112 9.315a3.113 3.113 0 1 1-6.226.002a3.113 3.113 0 0 1 6.226-.002"></path>
                <circle
                  cx={20}
                  cy={19.999}
                  r={3.112}
                ></circle>
                <circle
                  cx={20}
                  cy={30.685}
                  r={3.112}
                ></circle>
              </g>
            </svg>
            گزینه ها
          </CButton>
        </div>
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
      <ParameterModal
        visible={parameterVisibel}
        setVisible={setParameterVisible}
      />
      <OptionModal
        visible={optionVisible}
        setVisible={setOptionVisible}
      />
    </div>
  );
}
