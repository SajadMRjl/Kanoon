import { CButton } from "@coreui/react";
import "./TypeSelector.css";
import { questionTypes } from "./QuestionTypes";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface InputProps {
  setVisible: Function;
}

const btns = questionTypes;

export default function TypeSelector({ setVisible }: InputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleClick = (e: string) => {
    router.push(
      pathname +
        "?" +
        createQueryString("type", e) +
        "&" +
        createQueryString("action", "create")
    );
    setVisible(true);
  };
  return (
    <div className="btn-container">
      {btns.map((btn) => {
        return btn.type === "OPENING" || btn.type === "ENDING" ? null : (
          <CButton
            key={btn.type}
            className="btn-item"
            type="button"
            variant="outline"
            onClick={() => handleClick(btn.type)}
          >
            <div className="icon">{btn.icon}</div>
            {btn.text}
          </CButton>
        );
      })}
    </div>
  );
}
