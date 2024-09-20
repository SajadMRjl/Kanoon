import { CFormCheck } from "@coreui/react";
import "./OutputChoice.css";

interface InputProps {
  index: number;
  text: string;
  checkedAnswer: number;
  setCheckedAnswer: Function;
}

export default function OutputChoice({
  index,
  text,
  checkedAnswer,
  setCheckedAnswer,
}: InputProps) {
  return (
    text && (
      <div
        className="output-choice"
        onClick={() => setCheckedAnswer(index - 1)}
      >
        <div className="index">{index}</div>
        <div className="text">{text}</div>
        <CFormCheck checked={checkedAnswer === index - 1} />
      </div>
    )
  );
}
