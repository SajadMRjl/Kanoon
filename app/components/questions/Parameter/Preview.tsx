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
    <div className="h-full w-1/2 flex flex-col justify-center items-start">
      <div className="flex gap-3 justify-center items-start mb-4">
        {index}.
        <div
          className="overflow-auto break-all"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <div className="flex gap-3 flex-wrap">
        {options?.map((option, index) => {
          return (
            <OutputChoice
              index={option.order}
              text={option.optionText}
              image={option.image}
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
