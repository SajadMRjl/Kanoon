import { CForm, CFormLabel, CButton, CFormInput } from "@coreui/react";
import EditableTextEditor from "../EditbleTextEditor";
import Choice from "./Choice";
import { option } from "@/app/api/postQuestion";
import postFactor from "@/app/api/postFactor";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import getAllFactors, { factor } from "@/app/api/getAllFactors";
import { factor as outputFactor } from "@/app/api/postQuestion";

interface InputProps {
  question: string;
  setQuestion: Function;
  answer: string;
  setAnswer: Function;
  options: option[];
  setOptions: Function;
}

export default function InputForm({
  question,
  setQuestion,
  answer,
  setAnswer,
  options,
  setOptions,
}: InputProps) {
  const { survey_id } = useParams();
  const [newFactor, setNewFactor] = useState("");
  const [surveyFactors, setSurveyFactors] = useState<factor[]>([]);

  useEffect(() => {
    fetchFactors();
  }, []);

  const fetchFactors = async () => {
    const response = await getAllFactors({
      survey_id: Array.isArray(survey_id) ? survey_id[0] : survey_id,
    });
    if (Array.isArray(response)) {
      setSurveyFactors(response);
    } else {
      console.log("error fetching factors");
    }
  };

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

  const handleAddFactor = async () => {
    const response = await postFactor({
      survey_id: Array.isArray(survey_id) ? survey_id[0] : survey_id,
      name: newFactor,
    });
    if (response === 200) {
      setNewFactor("");
      fetchFactors();
    } else {
      console.log("error posting factor");
    }
  };

  const updateOptionFactor = (index: number, factors: outputFactor[]) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, factorImpacts: factors } : option
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
        <CFormLabel>گزینه ها</CFormLabel>
        <div className="choices">
          {options.map((option, index) => (
            <Choice
              key={index}
              index={option.order}
              option={option}
              setText={(text: string) => setOptionText(index, text)}
              handleDelete={() => handleDelete(index)}
              updateOptionFactor={updateOptionFactor}
              surveyFactors={surveyFactors}
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
        <div className="flex flex-row w-full">
          <CFormInput
            placeholder="افزودن فاکتور"
            value={newFactor}
            onChange={(e) => setNewFactor(e.target.value)}
          ></CFormInput>
          <CButton
            type="button"
            variant="ghost"
            onClick={handleAddFactor}
          >
            +
          </CButton>
        </div>
      </CForm>
    </div>
  );
}
