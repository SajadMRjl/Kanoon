interface InputProps {
  question: string;
}

export default function Preview({ question }: InputProps) {
  return (
    <div className="h-full w-1/2 flex flex-col justify-center items-start">
      <div className="flex gap-3 justify-center items-start mb-4">
        <div
          className="w-full break-all"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
    </div>
  );
}
