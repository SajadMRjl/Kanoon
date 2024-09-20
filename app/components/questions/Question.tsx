import { CButton, CFormInput } from "@coreui/react";
import "./Question.css";
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useCallback } from "react";

interface InputProps {
  index: number;
  text: string;
  handleDelete: Function;
  id: number;
  type: string;
  setVisible: Function;
}

export default function Question({
  index,
  text,
  handleDelete,
  id,
  type,
  setVisible,
}: InputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { survey_id } = useParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleClick = () => {
    router.push(
      pathname +
        "?" +
        createQueryString("type", type) +
        "&" +
        createQueryString("action", "edit") +
        "&" +
        createQueryString("id", id.toString())
    );
    setVisible(true);
  };

  return (
    <div
      className="question-content hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className="index">{index}</div>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <CButton
        variant="ghost"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(id);
        }}
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
    </div>
  );
}
