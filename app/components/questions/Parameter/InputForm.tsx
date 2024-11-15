import {
  CForm,
  CFormLabel,
  CButton,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import EditableTextEditor from "../EditbleTextEditor";
import Choice from "./Choice";
import { useState, useEffect } from "react";
import { Parameter } from "../OptoinModal";
import { Option } from "../OptoinModal";
import { option } from "@/app/api/postQuestion";
import { useParams } from "next/navigation";
import fetchParameters from "@/app/api/getAllParams";
import fetchStaticOptions from "@/app/api/getAllStaticOptions";

interface InputProps {
  question: string;
  setQuestion: Function;
  setOptions: Function;
}

export default function InputForm({
  question,
  setQuestion,
  setOptions,
}: InputProps) {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [selectedParameterId, setSelectedParameterId] = useState<string | null>(
    null
  );
  const [selectedFactorId, setSelectedFactorId] = useState<number | null>(null);
  const [selectedParameter, setSelectedParameter] = useState<Parameter>();
  const [predefinedOptions, setPredefinedOptions] = useState<Option[]>([]);
  const [filteredOptions, setfilteredOptions] = useState<Option[]>([]);

  const { survey_id } = useParams();
  const surveyId = Array.isArray(survey_id) ? survey_id[0] : survey_id;

  useEffect(() => {
    const fetchAndSetParameters = async () => {
      const fetchedParameters = await fetchParameters(surveyId);
      if (typeof fetchedParameters !== "number") {
        setParameters(fetchedParameters);
      } else {
        console.error("Failed to fetch parameters, status:", fetchedParameters);
      }
    };
    const fetchAndSetStaticOptions = async () => {
      const staticOptions = await fetchStaticOptions(surveyId);
      setPredefinedOptions(staticOptions);
    };

    fetchAndSetParameters();
    fetchAndSetStaticOptions();
  }, [surveyId]);

  useEffect(() => {
    setSelectedParameter(
      parameters?.find((param) => param.id === selectedParameterId)
    );
  }, [selectedParameterId, parameters]);

  useEffect(() => {
    const tmp = predefinedOptions.filter(
      (option) => option.staticFactorImpacts?.factorId === selectedFactorId
    );
    setfilteredOptions(tmp);
    setOptions(tmp);
  }, [selectedFactorId, predefinedOptions]);

  return (
    <div>
      <CForm className="input-form">
        <CFormLabel>سوال</CFormLabel>
        <EditableTextEditor
          editorHtml={question}
          setEditorHtml={setQuestion}
          placeholder="متن سوال ..."
        />
        <CFormSelect
          label="پارامتر ها"
          className="w-full"
          onChange={(e) => {
            setSelectedParameterId(e.target.value);
            setSelectedFactorId(null);
          }}
          value={selectedParameterId || ""}
        >
          <option
            disabled
            value=""
          >
            یک پارامتر را انتخاب کنید
          </option>
          {parameters?.map((param) => (
            <option
              key={param.id}
              value={param.id}
            >
              {param.name}
            </option>
          ))}
        </CFormSelect>
        <CFormSelect
          className="w-full"
          label="شاخص ها"
          onChange={(e) => setSelectedFactorId(Number(e.target.value))}
          value={selectedFactorId || ""}
        >
          <option
            disabled
            value=""
          >
            {selectedParameterId || selectedParameterId === ""
              ? "یک شاخص را انتخاب کنید"
              : "ابتدا یک پارامتر را انتخاب کنید"}
          </option>
          {selectedParameter?.factors.map((param) => (
            <option
              key={param.id}
              value={param.id}
            >
              {param.name}
            </option>
          ))}
        </CFormSelect>
        <CFormLabel>گزینه ها</CFormLabel>
        <div className="choices">
          {filteredOptions.map((option, index) => (
            <Choice
              key={option.id}
              text={option.optionText}
            />
          ))}
        </div>
      </CForm>
    </div>
  );
}
