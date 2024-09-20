import { CButton, CCollapse, CFormInput } from "@coreui/react";
import "./Choice.css";
import { useState } from "react";
import { factor, option } from "@/app/api/postQuestion";
import { factor as inputFactor } from "@/app/api/getAllFactors";
import Factor from "./Factor";

interface InputProps {
  index: number;
  option: option;
  setText: Function;
  handleDelete: Function;
  updateOptionFactor: (index: number, factors: factor[]) => void;
  surveyFactors: inputFactor[];
}

export default function Choice({
  index,
  option,
  setText,
  handleDelete,
  updateOptionFactor,
  surveyFactors,
}: InputProps) {
  const [expended, setExpended] = useState(false);

  const handleUpdateFactor = (factorIndex: number, updatedFactor: factor) => {
    const updatedFactors = option.factorImpacts.map((f, i) =>
      i === factorIndex ? updatedFactor : f
    );
    updateOptionFactor(index - 1, updatedFactors);
  };

  const handleAddFactor = (newFactor: factor) => {
    updateOptionFactor(index - 1, [...option.factorImpacts, newFactor]);
  };

  return (
    <div className="choice-container">
      <div className="pchoice">
        <div className="index">{index}</div>
        <CFormInput
          value={option.optionText}
          placeholder={`گزینه ${index}`}
          onChange={(e) => setText(e.target.value)}
        />
        <CButton
          variant="ghost"
          type="button"
          onClick={(e) => handleDelete()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
            ></path>
          </svg>
        </CButton>
        <CButton
          className="last-btn"
          variant="ghost"
          type="button"
          onClick={() => setExpended(!expended)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            {expended ? (
              <path
                fill="currentColor"
                d="m12 8l-6 6l1.41 1.41L12 10.83l4.59 4.58L18 14z"
              ></path>
            ) : (
              <path
                fill="currentColor"
                d="M15.88 9.29L12 13.17L8.12 9.29a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41c-.39-.38-1.03-.39-1.42 0"
              ></path>
            )}
          </svg>
        </CButton>
      </div>
      <CCollapse visible={expended}>
        <Factor
          factors={option.factorImpacts}
          onUpdateFactor={handleUpdateFactor}
          onAddFactor={handleAddFactor}
          surveyFactors={surveyFactors}
        />
      </CCollapse>
    </div>
  );
}
