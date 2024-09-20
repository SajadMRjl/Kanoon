import { CFormTextarea } from "@coreui/react";

interface InputProps {
  question: string;
  answer: string;
  index: number;
}

export default function Preview({ question, answer, index }: InputProps) {
  return (
    <div className="h-full w-1/2 flex flex-col justify-center items-start">
      <div className="flex gap-3 justify-center items-start mb-4">
        {index}.
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <CFormTextarea
        value={answer}
        rows={3}
      />
    </div>
  );
}
