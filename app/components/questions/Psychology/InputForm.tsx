import { CForm, CFormLabel, CButton, CFormInput } from "@coreui/react";
import EditableTextEditor from "../EditbleTextEditor";
import Choice from "./Choice";
import { option } from "@/app/api/postQuestion";
import postFactor from "@/app/api/postFactor";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import getAllFactors, { factor } from "@/app/api/getAllFactors";
import { factor as outputFactor } from "@/app/api/postQuestion";
import postImage from "@/app/api/postImage";

interface InputProps {
  question: string;
  setQuestion: Function;
  answer: string;
  setAnswer: Function;
  options: option[];
  setOptions: Function;
  image: string;
  setImage: Function;
}

export default function InputForm({
  question,
  setQuestion,
  answer,
  setAnswer,
  options,
  setOptions,
  image,
  setImage,
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
