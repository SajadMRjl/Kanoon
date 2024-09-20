import { CFormTextarea } from "@coreui/react";

interface InputProps {
  question: string;
  setAnswer: (arg0: string) => void;
  index: number;
}

export default function Output({ question, setAnswer, index }: InputProps) {
  return (
    <div className="h-full w-1/2 flex flex-col justify-center items-start">
      <div className="flex gap-3 justify-center items-start mb-4">
        {index}.
        <div
          className="overflow-auto"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <CFormTextarea
        placeholder="پاسخ خود را وارد کنید"
        onChange={(e) => setAnswer(e.target.value)}
      />
    </div>
  );
}
