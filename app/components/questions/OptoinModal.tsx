import { useState, useEffect } from "react";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CFormSelect,
  CButton,
  CFormInput,
  CModalFooter,
} from "@coreui/react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import "./ParameterModal.css";
import fetchParameters from "@/app/api/getAllParams";
import { useParams } from "next/navigation";
import { CSmartTable } from "@coreui/react-pro";
import deleteFactor from "@/app/api/deleteFactor";
import createOption from "@/app/api/postOption";
import fetchStaticOptions from "@/app/api/getAllStaticOptions";
import deleteStaticFactorImpact from "@/app/api/deleteStaticOption";

interface staticFactorImpacts {
  factorId: number;
  impact: number;
  plus: boolean;
}

export interface Option {
  id?: string;
  order: number;
  optionText: string;
  staticFactorImpacts: staticFactorImpacts;
}

interface Factor {
  id: string;
  name: string;
}

export interface Parameter {
  id?: string;
  name: string;
  factors: Factor[];
}

interface InputProps {
  visible: boolean;
  setVisible: Function;
}

export default function OptionModal({ visible, setVisible }: InputProps) {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [selectedParameterId, setSelectedParameterId] = useState<string | null>(
    null
  );
  const [selectedFactorId, setSelectedFactorId] = useState<number | null>(null);
  const [selectedParameter, setSelectedParameter] = useState<Parameter>();
  const [newOptionText, setNewOptionText] = useState("");
  const [newFactorImpact, setNewFactorImpact] = useState<number>();
  const [newOptions, setNewOptions] = useState<Option[]>([]);
  const [predefinedOptions, setPredefinedOptions] = useState<Option[]>([]);
  const [filteredOptions, setfilteredOptions] = useState<Option[]>([]);
  const [refrsh, setRefresh] = useState(false);

  const { survey_id } = useParams();
  const surveyId = Array.isArray(survey_id) ? survey_id[0] : survey_id;

  const columns = [
    {
      key: "optionText",
      label: "متن گزینه",
    },
    {
      key: "staticFactorImpacts",
      label: "تاثیر بر شاخص",
    },
    {
      key: "action",
      label: "حذف",
      filter: false,
      sorter: false,
      _style: { width: "10%", textAlign: "center", padding: "0" },
    },
  ];

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
    if (visible) {
      fetchAndSetParameters();
    }
    if (visible || refrsh) {
      fetchAndSetStaticOptions();
      setRefresh(false);
    }
  }, [surveyId, visible, refrsh]);

  useEffect(() => {
    setSelectedParameter(
      parameters?.find((param) => param.id === selectedParameterId)
    );
  }, [selectedParameterId, parameters]);

  useEffect(() => {
    setfilteredOptions(
      predefinedOptions.filter(
        (option) => option.staticFactorImpacts?.factorId === selectedFactorId
      )
    );
  }, [selectedFactorId, predefinedOptions]);

  const handleSave = async (closeAfterSave: boolean) => {
    try {
      const optionPromises = newOptions.map((option) => {
        const newOption = {
          optionText: option.optionText,
          order: newOptions.indexOf(option),
          staticFactorImpacts: [
            {
              factorId: option.staticFactorImpacts.factorId,
              impact: option.staticFactorImpacts.impact,
              plus: option.staticFactorImpacts.plus,
            },
          ],
        };
        return createOption(surveyId, newOption);
      });

      await Promise.all(optionPromises);

      setSelectedParameterId(null);
      setSelectedFactorId(null);

      if (closeAfterSave) {
        setVisible(false);
      }
    } catch (error) {
      console.error("Error saving options:", error);
    }
  };

  const handleRemove = async (option: Option) => {
    if (option.id) {
      const isDeleted = await deleteStaticFactorImpact(surveyId, option.id);
      if (isDeleted) {
        setPredefinedOptions((prevOptions) =>
          prevOptions.filter((opt) => opt.id !== option.id)
        );
      }
    } else {
      setNewOptions((prevOptions) =>
        prevOptions.filter((opt) => opt !== option)
      );
    }
    setRefresh(true);
  };

  const handleAddOption = () => {
    setNewOptions((prev) =>
      prev.concat({
        optionText: newOptionText,
        order: prev.length,
        staticFactorImpacts: {
          factorId: Number(selectedFactorId),
          impact: Math.abs(newFactorImpact || 0),
          plus: newFactorImpact ? newFactorImpact > 0 : false,
        },
      })
    );
    setNewOptionText("");
    setNewFactorImpact(0);
  };

  return (
    <CModal
      className="optional-modal"
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <CModalHeader className="flex items-center justify-between text-xl font-semibold">
        مدیریت گزینه ها
      </CModalHeader>
      <CModalBody className="p-6 space-y-6 container">
        <div className="flex flex-col gap-2">
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
        </div>

        {selectedFactorId !== null && (
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CFormInput
                  placeholder="متن گزینه"
                  value={newOptionText}
                  onChange={(e) => setNewOptionText(e.target.value)}
                  className="w-full"
                />
                <CFormInput
                  placeholder="تاثیر شاخص"
                  type="number"
                  value={newFactorImpact}
                  onChange={(e) =>
                    setNewFactorImpact(
                      e.target.value === "0"
                        ? undefined
                        : Number(e.target.value)
                    )
                  }
                  className="w-full number-input"
                />
                <CButton
                  color="primary"
                  onClick={handleAddOption}
                >
                  <FiPlus className="text-lg" />
                  <span>افزودن</span>
                </CButton>
              </div>
              <div className="overflow-y-auto">
                <h6 className="mt-4 font-bold text-xl">لیست گزینه ها</h6>
                <CSmartTable
                  activePage={1}
                  columns={columns}
                  items={[...filteredOptions, ...newOptions]}
                  tableFilter={false}
                  noItemsLabel={"هیچ گزینه ای تعریف نشده است"}
                  scopedColumns={{
                    action: (item: Option) => {
                      return (
                        <td className="action">
                          <CButton onClick={(event) => handleRemove(item)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#D92641"
                                d="M12 2.75a2.25 2.25 0 0 0-2.122 1.5a.75.75 0 0 1-1.414-.5a3.751 3.751 0 0 1 7.073 0a.75.75 0 0 1-1.415.5A2.251 2.251 0 0 0 12 2.75M2.75 6a.75.75 0 0 1 .75-.75h17a.75.75 0 0 1 0 1.5h-17A.75.75 0 0 1 2.75 6m3.165 2.45a.75.75 0 1 0-1.497.1l.464 6.952c.085 1.282.154 2.318.316 3.132c.169.845.455 1.551 1.047 2.104c.591.554 1.315.793 2.17.904c.822.108 1.86.108 3.146.108h.879c1.285 0 2.324 0 3.146-.108c.854-.111 1.578-.35 2.17-.904c.591-.553.877-1.26 1.046-2.104c.162-.814.23-1.85.316-3.132l.464-6.952a.75.75 0 0 0-1.497-.1l-.46 6.9c-.09 1.347-.154 2.285-.294 2.99c-.137.685-.327 1.047-.6 1.303c-.274.256-.648.422-1.34.512c-.713.093-1.653.095-3.004.095h-.774c-1.35 0-2.29-.002-3.004-.095c-.692-.09-1.066-.256-1.34-.512c-.273-.256-.463-.618-.6-1.303c-.14-.705-.204-1.643-.294-2.99z"
                              ></path>
                              <path
                                fill="#D92641"
                                d="M9.425 10.254a.75.75 0 0 1 .821.671l.5 5a.75.75 0 0 1-1.492.15l-.5-5a.75.75 0 0 1 .671-.821m5.821.821a.75.75 0 0 0-1.492-.15l-.5 5a.75.75 0 0 0 1.492.15z"
                              ></path>
                            </svg>
                          </CButton>
                        </td>
                      );
                    },
                    staticFactorImpacts: (item: Option) => {
                      return (
                        <td>
                          {item.staticFactorImpacts.plus
                            ? item.staticFactorImpacts.impact
                            : -item.staticFactorImpacts.impact}
                        </td>
                      );
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => handleSave(false)}
        >
          ذخیره
        </CButton>
        <CButton
          color="primary"
          onClick={() => handleSave(true)}
        >
          ذخیره و بستن
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
