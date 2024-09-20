import { CForm, CFormLabel, CFormTextarea, CFormInput } from "@coreui/react";
import EditableTextEditor from "../EditbleTextEditor";

interface InputProps {
  question: string;
  setQuestion: Function;
  answer: string;
  setAnswer: Function;
  point?: number;
  setPoint: Function;
}

export default function InputForm({
  question,
  setQuestion,
  answer,
  setAnswer,
  point,
  setPoint,
}: InputProps) {
  return (
    <div>
      <CForm className="input-form">
        <CFormLabel>سوال</CFormLabel>
        <EditableTextEditor
          editorHtml={question}
          setEditorHtml={setQuestion}
          placeholder="متن سوال ..."
        />

        <CFormLabel>پاسخ</CFormLabel>
        <CFormTextarea
          placeholder="پاسخ صحیح"
          value={answer}
          rows={3}
          onChange={(e) => setAnswer(e.currentTarget.value)}
        />
        <CFormLabel>نمره</CFormLabel>
        <CFormInput
          placeholder="نمره"
          value={point}
          onChange={(e) => setPoint(e.currentTarget.value)}
        />
      </CForm>
    </div>
  );
}
