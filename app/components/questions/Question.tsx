import { CButton, CFormInput } from "@coreui/react";
import "./Question.css";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface InputProps {
  index: number;
  text: string;
  hadleDelete: Function;
  id: number;
}

export default function Question({ index, text, hadleDelete, id }: InputProps) {
  const router = useRouter();

  const { survey_id } = useParams();

  return (
    <Link
      className="question-content"
      href={`survey/${survey_id}/questions/${id}/${text}`}
    >
      <div className="index">{index}</div>
      <p>{text}</p>
      <CButton
        variant="ghost"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
          ></path>
        </svg>
      </CButton>
    </Link>
  );
}
