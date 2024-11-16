import {
  CForm,
  CFormLabel,
  CFormTextarea,
  CFormInput,
  CFormFeedback,
} from "@coreui/react";
import EditableTextEditor from "../EditbleTextEditor";
import { useState } from "react";

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
  console.log(question);
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
      </CForm>
    </div>
  );
}
