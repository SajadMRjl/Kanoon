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
import { v4 as uuidv4 } from "uuid"; // For generating temporary IDs
import fetchParameters from "@/app/api/getAllParams";
import { useParams } from "next/navigation";
import updateParameter from "@/app/api/putParam";
import createParameter from "@/app/api/postParam";
import { CSmartTable } from "@coreui/react-pro";
import deleteFactor from "@/app/api/deleteFactor";
import deleteParameter from "@/app/api/deleteParameter";

interface Option {
  id: string;
  label: string;
  valueChange: number;
}

interface Factor {
  id: string;
  name: string;
  options: Option[];
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

export default function ParameterModal({ visible, setVisible }: InputProps) {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [newParameters, setNewParameters] = useState<Parameter[]>([]);
  const [newParameter, setNewParameter] = useState<Parameter>({
    factors: [],
    name: "",
  });
  const [selectedParameterId, setSelectedParameterId] = useState<string | null>(
    null
  );
  const [newFactorName, setNewFactorName] = useState("");
  const [selectedParameter, setSelectedParameter] = useState<Parameter>();
  const [refrsh, setRefresh] = useState(false);

  const { survey_id } = useParams();
  const surveyId = Array.isArray(survey_id) ? survey_id[0] : survey_id;

  const columns = [
    {
      key: "name",
      label: "شاخص",
    },
    {
      key: "action",
      label: "عملیات",
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
    if (visible || refrsh) {
      fetchAndSetParameters();
      setRefresh(false);
    }
  }, [surveyId, visible, refrsh]);

  useEffect(() => {
    setSelectedParameter(
      parameters?.find((param) => param.id === selectedParameterId) ||
        newParameters?.find((param) => param.id === selectedParameterId)
    );
  }, [selectedParameterId, parameters, newParameters]);

  const handleAddFactor = () => {
    if (!selectedParameterId || !newFactorName) return;

    const newFactor = {
      id: uuidv4(),
      name: newFactorName,
      options: [],
    };

    const isInParameters = parameters?.some(
      (param) => param.id === selectedParameterId
    );

    if (isInParameters) {
      const tmp = parameters?.map((param) =>
        param.id === selectedParameterId
          ? {
              ...param,
              factors: [...param.factors, newFactor],
            }
          : param
      );
      setParameters(tmp);
    } else {
      const tmp = newParameters?.map((param) =>
        param.id === selectedParameterId
          ? {
              ...param,
              factors: [...param.factors, newFactor],
            }
          : param
      );
      setNewParameters(tmp);
    }

    setNewFactorName("");
  };

  const handleRemoveParameter = () => {
    if (parameters.find((param) => param.id === selectedParameterId))
      deleteParameter({
        survey_id: surveyId,
        parameter_id: selectedParameterId || "",
      });
    else
      setNewParameters((prevParameters) =>
        prevParameters?.filter((param) => param.id !== selectedParameterId)
      );
    setSelectedParameterId(null);
    setRefresh(true);
  };

  const handleAddNewParameter = () => {
    const newParamWithTempId = { ...newParameter, id: uuidv4() };
    setNewParameters((prev) => prev.concat(newParamWithTempId));
    setNewParameter({
      factors: [],
      name: "",
    });
  };

  const handleSave = async () => {
    try {
      const createdParams = await Promise.all(
        newParameters.map((param) => createParameter(surveyId, param))
      );

      // Save updated parameters
      await Promise.all(
        parameters.map((param) => {
          if (param.id) {
            return updateParameter(surveyId, param.id, param);
          }
        })
      );

      setNewParameters([]);
      setRefresh(true);
      setSelectedParameterId(null);
      setVisible(false);
    } catch (error) {
      console.error("Error saving parameters:", error);
    }
  };

  const handleRemove = (id: string) => {
    if (selectedParameter?.factors.find((factor) => factor.id === id))
      selectedParameter.factors.filter((factor) => factor.id !== id);
    deleteFactor({ factor_id: id, survey_id: surveyId });
    setRefresh(true);
  };

  return (
    <CModal
      className="parameter-modal"
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <CModalHeader className="flex items-center justify-between text-xl font-semibold">
        مدیریت عاملها
      </CModalHeader>
      <CModalBody className="p-6 space-y-6 container">
        <div className="flex items-center gap-2">
          <CFormInput
            className="w-full"
            placeholder="عامل"
            value={newParameter.name}
            onChange={(e) =>
              setNewParameter({ ...newParameter, name: e.currentTarget.value })
            }
          />
          <CButton
            className="add-btn"
            color="primary"
            onClick={handleAddNewParameter}
            disabled={!newParameter.name}
          >
            <FiPlus className="text-lg" />
            <span>افزودن</span>
          </CButton>
        </div>
        <div className="flex items-center gap-2">
          <CFormSelect
            className="w-full"
            onChange={(e) => setSelectedParameterId(e.target.value)}
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
            {newParameters.map((param) => (
              <option
                key={param.id}
                value={param.id}
              >
                {param.name}
              </option>
            ))}
          </CFormSelect>
          <CButton
            className="remove-btn"
            color="primary"
            onClick={handleRemoveParameter}
            disabled={!selectedParameterId}
          >
            <FiTrash2 className="text-lg" />
            <span>حذف</span>
          </CButton>
        </div>

        {selectedParameter && (
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CFormInput
                  placeholder="شاخص"
                  value={newFactorName}
                  onChange={(e) => setNewFactorName(e.target.value)}
                  className="w-full"
                />
                <CButton
                  color="primary"
                  onClick={handleAddFactor}
                >
                  <FiPlus className="text-lg" />
                  <span>افزودن</span>
                </CButton>
              </div>
              <div className="overflow-y-auto">
                <h6 className="mt-4 font-bold text-xl">لیست شاخص ها</h6>
                <CSmartTable
                  activePage={1}
                  columns={columns}
                  items={selectedParameter.factors}
                  tableFilter={false}
                  noItemsLabel={"هیچ شاخصی تعریف نشده است"}
                  scopedColumns={{
                    action: (item: Factor) => {
                      return (
                        <td className="action">
                          <CButton onClick={(event) => handleRemove(item.id)}>
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
          onClick={() => handleSave()}
        >
          ذخیره
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
