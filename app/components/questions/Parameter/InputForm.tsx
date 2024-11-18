import {
  CForm,
  CFormLabel,
  CButton,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import EditableTextEditor from "../EditbleTextEditor";
import Choice from "./Choice";
import { useState, useEffect, useRef } from "react";
import { Parameter } from "../OptoinModal";
import { Option } from "../OptoinModal";
import { useParams } from "next/navigation";
import fetchParameters from "@/app/api/getAllParams";
import fetchStaticOptions from "@/app/api/getAllStaticOptions";
import postImage from "@/app/api/postImage";

interface InputProps {
  question: string;
  setQuestion: Function;
  setOptions: Function;
  image: string;
  setImage: Function;
}

export default function InputForm({
  question,
  setQuestion,
  setOptions,
  image,
  setImage,
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  const handleButtonClick = () => {
    setError(false);
    if (image) {
      setImage(undefined);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError(false);
      if (file.size > 2 * 1024 * 1024) {
        setError(true);
        return;
      }
      postImage(file, setImage);
    }
  };

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
    const tmp = predefinedOptions
      .filter(
        (option) => option.staticFactorImpacts?.factorId === selectedFactorId
      )
      .sort((a, b) => a.order - b.order);

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
        <div className="flex flex-row justify-between items-center w-full">
          <CFormLabel>افزودن تصویر</CFormLabel>

          <CButton
            className="m-0 p-1"
            variant="ghost"
            type="button"
            onClick={handleButtonClick}
          >
            {image ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 48 48"
              >
                <g fill="none">
                  <path
                    fill="currentColor"
                    d="M44 23.994a2 2 0 0 0-4 0zm-20-16a2 2 0 1 0 0-4zm15 32H9v4h30zm-31-1v-30H4v30zm32-15v15h4v-15zm-31-16h15v-4H9zm0 32a1 1 0 0 1-1-1H4a5 5 0 0 0 5 5zm30 4a5 5 0 0 0 5-5h-4a1 1 0 0 1-1 1zm-31-35a1 1 0 0 1 1-1v-4a5 5 0 0 0-5 5z"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="m6 35l10.693-9.802a2 2 0 0 1 2.653-.044L32 36m-4-5l4.773-4.773a2 2 0 0 1 2.615-.186L42 31M33 7l8 8m0-8l-8 8"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 48 48"
              >
                <g fill="none">
                  <path
                    fill="currentColor"
                    d="M44 24a2 2 0 1 0-4 0zM24 8a2 2 0 1 0 0-4zm15 32H9v4h30zM8 39V9H4v30zm32-15v15h4V24zM9 8h15V4H9zm0 32a1 1 0 0 1-1-1H4a5 5 0 0 0 5 5zm30 4a5 5 0 0 0 5-5h-4a1 1 0 0 1-1 1zM8 9a1 1 0 0 1 1-1V4a5 5 0 0 0-5 5z"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="m6 35l10.693-9.802a2 2 0 0 1 2.653-.044L32 36m-4-5l4.773-4.773a2 2 0 0 1 2.615-.186L42 31M30 12h12m-6-6v12"
                  ></path>
                </g>
              </svg>
            )}
          </CButton>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        {error && (
          <div className="text-danger text-sm mt-1">
            تصویر باید کمتر از 2 مگابایت باشد.
          </div>
        )}
        <CFormSelect
          label="عامل ها"
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
            یک عامل را انتخاب کنید
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
              : "ابتدا یک عامل را انتخاب کنید"}
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
