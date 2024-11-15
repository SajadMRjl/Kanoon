import "./Choice.css";

interface InputProps {
  text: string;
}

export default function Choice({ text }: InputProps) {
  return (
    <div className="choice">
      <div className="flex items-center justify-start p-2">{text}</div>
    </div>
  );
}
