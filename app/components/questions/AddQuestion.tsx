import { CModal, CModalBody } from "@coreui/react";

import "./AddQuestion.css";
import AddQuestionForm from "./AddQuestionForm";
import { useState } from "react";
import Output from "./ShortText/Output";

interface InputProps {
  visible: boolean;
  setVisible: Function;
  index: number;
}

export default function AddQuestion({
  visible,
  setVisible,
  index,
}: InputProps) {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  return (
    <CModal
      visible={visible}
      backdrop={"static"}
      focus
      keyboard
    >
      <CModalBody>
        <div className="question-input-form">
          <AddQuestionForm
            setVisible={setVisible}
            index={index}
            question={question}
            setQuestion={setQuestion}
            answer={answer}
            setAnswer={setAnswer}
          />
        </div>
        <div className="question-preview">
          <Output
            question={question}
            answer={answer}
            index={index}
          />
        </div>
      </CModalBody>
    </CModal>
  );
}
