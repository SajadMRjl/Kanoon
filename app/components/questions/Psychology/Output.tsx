import { Option } from "@/app/api/getPublicExamAllQuestions";
import OutputChoice from "./OutputChoice";
import { useState, useEffect } from "react";

interface InputProps {
  question: string;
  options: Option[];
  setOptionId: (arg0: number) => void;
  index: number;
}

export default function Output({
  question,
  options,
  setOptionId,
  index,
}: InputProps) {
  const [checkedAnswer, setCheckedAnswer] = useState(-1);

  useEffect(() => {
    if (checkedAnswer !== -1) {
      setOptionId(options[checkedAnswer].id);
    }
  }, [checkedAnswer]);

  useEffect(() => {
    setCheckedAnswer(-1);
  }, [question]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-start">
      <div className="flex gap-3 justify-center items-start mb-4">
        {index}.
        <div
          className="overflow-auto break-all"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <div className="flex flex-row gap-1 flex-wrap">
        {options?.map((option, index) => {
          return (
            <OutputChoice
              index={index + 1}
              text={option.optionText}
              key={index}
              checkedAnswer={checkedAnswer}
              setCheckedAnswer={setCheckedAnswer}
            />
          );
        })}
      </div>
    </div>
  );
}
