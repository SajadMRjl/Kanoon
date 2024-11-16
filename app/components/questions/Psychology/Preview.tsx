import { option } from "@/app/api/postQuestion";
import OutputChoice from "./OutputChoice";
import { useState } from "react";

interface InputProps {
  question: string;
  options: option[];
  index: number;
}

export default function Preview({ question, options, index }: InputProps) {
  const [checkedAnswer, setCheckedAnswer] = useState(-1);
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
