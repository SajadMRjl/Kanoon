import { CFormTextarea } from "@coreui/react";

interface InputProps {
  question: string;
  answer: string;
  index: number;
}

export default function Preview({ question, answer, index }: InputProps) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-start">
      <div className="flex w-full gap-3 justify-start items-start mb-4">
        {index}.
        <div
          className="w-full break-all"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <div className="w-1/2">
        <CFormTextarea
          value={answer}
          rows={3}
        />
      </div>
    </div>
  );
}
