interface InputProps {
  question: string;
}

export default function Output({ question }: InputProps) {
  return (
    <div className="h-full w-1/2 flex flex-col justify-center items-start">
      <div className="flex gap-3 justify-center items-start mb-4">
        <div
          className="overflow-auto break-all"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
    </div>
  );
}
