import { CFormInput } from "@coreui/react";
import { useEffect, useState } from "react";

interface InputProps {
  question: string;
  setAnswer: (arg0: string) => void;
  index: number;
}

export default function Output({ question, setAnswer, index }: InputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setAnswer(newValue); // Pass the updated value to the parent component
  };

  useEffect(() => {
    setInputValue("");
  }, [question]);

  return (
    <div className="h-full w-1/2 flex flex-col justify-center items-start">
      <div className="flex gap-3 justify-center items-start mb-4">
        {index}.
        <div
          className="overflow-auto"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <CFormInput
        value={inputValue} // Bind the input value to local state
        placeholder="پاسخ خود را وارد کنید"
        onChange={handleInputChange}
      />
    </div>
  );
}
