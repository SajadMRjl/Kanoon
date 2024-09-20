import { CForm, CFormLabel, CButton, CFormInput } from "@coreui/react";
import EditableTextEditor from "../EditbleTextEditor";
import Choice from "./Choice";
import { option } from "@/app/api/postQuestion";
import { useState } from "react";

interface InputProps {
  question: string;
  setQuestion: Function;
  correctOption?: number;
  setCorrectOption: Function;
  options: option[];
  setOptions: Function;
  point?: number;
  setPoint: Function;
}

export default function InputForm({
  question,
  setQuestion,
  correctOption,
  setCorrectOption,
  options,
  setOptions,
  point,
  setPoint,
}: InputProps) {
  const addOption = () => {
    const newOption: option = {
      optionText: "",
      factorImpacts: [],
      image: "",
      order: options.length + 1,
    };
    setOptions([...options, newOption]);
  };

  const handleDelete = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const setOptionText = (index: number, text: string) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, optionText: text } : option
    );
    setOptions(updatedOptions);
  };

  return (
    <div>
      <CForm className="input-form">
        <CFormLabel>سوال</CFormLabel>
        <EditableTextEditor
          editorHtml={question}
          setEditorHtml={setQuestion}
          placeholder="متن سوال ..."
        />
        <CFormLabel>نمره</CFormLabel>
        <CFormInput
          placeholder="نمره"
          value={point}
          onChange={(e) => setPoint(e.currentTarget.value)}
        />
        <CFormLabel>گزینه ها</CFormLabel>
        <div className="choices">
          {options.map((option, index) => (
            <Choice
              key={index}
              index={index + 1}
              text={option.optionText}
              CorrectOption={correctOption}
              setCorrectOption={setCorrectOption}
              setText={(text: string) => setOptionText(index, text)}
              handleDelete={() => handleDelete(index)}
              length={options.length}
            />
          ))}
        </div>
        <CButton
          className="add-choice"
          type="button"
          onClick={addOption}
        >
          افزودن گزینه
        </CButton>
      </CForm>
    </div>
  );
}
