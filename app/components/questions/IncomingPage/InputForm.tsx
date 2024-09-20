import { CForm, CFormLabel, CFormTextarea } from "@coreui/react";
import EditableTextEditor from "../EditbleTextEditor";

interface InputProps {
  question: string;
  setQuestion: Function;
}

export default function InputForm({ question, setQuestion }: InputProps) {
  return (
    <div>
      <CForm className="input-form">
        <CFormLabel>متن خوش آمدگویی</CFormLabel>
        <EditableTextEditor
          editorHtml={question}
          setEditorHtml={setQuestion}
          placeholder="متن خوش آمدگویی ..."
        />
      </CForm>
    </div>
  );
}
