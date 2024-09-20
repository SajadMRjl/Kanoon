import { CButton, CForm, CFormInput, CFormSelect } from "@coreui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { factor as FactorType } from "@/app/api/postQuestion";
import { factor as InputFactor } from "@/app/api/getAllFactors";
import "./Factor.css";

interface InputProps {
  factors: FactorType[];
  onUpdateFactor: (index: number, updatedFactor: FactorType) => void;
  onAddFactor: (newFactor: FactorType) => void;
  surveyFactors: InputFactor[];
}

export default function Factor({
  factors,
  onUpdateFactor,
  onAddFactor,
  surveyFactors,
}: InputProps) {
  const { survey_id } = useParams();
  const [newFactorId, setNewFactorId] = useState<number>(-1);
  const [newImpact, setNewImpact] = useState<number | null>(null);
  const [newSign, setNewSign] = useState<boolean>(true);

  const handleFactorChange = (index: number, field: string, value: any) => {
    const updatedFactor = { ...factors[index], [field]: value };
    onUpdateFactor(index, updatedFactor);
  };

  useEffect(() => {
    if (newFactorId === -1) {
      setNewFactorId(factors.length !== 0 ? factors[0].factorId : -1);
    }
  }, [factors]);

  return (
    <CForm className="factor-container">
      {factors.map((factor, index) => (
        <div
          className="factor-selector"
          key={index}
        >
          <CFormSelect
            className="bg-inherit"
            value={factor.factorId}
            onChange={(e) =>
              handleFactorChange(index, "factorId", Number(e.target.value))
            }
          >
            {surveyFactors.map((surveyFactor) => (
              <option
                key={surveyFactor.id}
                value={surveyFactor.id}
              >
                {surveyFactor.name}
              </option>
            ))}
          </CFormSelect>
          <CFormInput
            type="number"
            className="text-left"
            value={factor.plus ? factor.impact : factor.impact * -1}
            onChange={(e) => {
              const value = e.target.value;
              console.log(value);
              if (value === "") {
                handleFactorChange(index, "impact", undefined);
              } else {
                const numericValue = Number(value);
                handleFactorChange(index, "plus", numericValue >= 0);
                handleFactorChange(index, "impact", Math.abs(numericValue));
              }
            }}
            placeholder="شاخص"
          />
        </div>
      ))}
      <div className="factor-selector">
        <CFormSelect
          className="bg-transparent border-0"
          value={newFactorId}
          placeholder="فاکتور"
          onChange={(e) => {
            setNewFactorId(Number(e.target.value));
          }}
        >
          <option
            value={-1}
            disabled
          >
            فاکتور ها
          </option>
          {surveyFactors.map((surveyFactor) => (
            <option
              key={surveyFactor.id}
              value={surveyFactor.id}
            >
              {surveyFactor.name}
            </option>
          ))}
        </CFormSelect>
        <CFormInput
          className="w-24"
          type="number"
          value={newImpact === null ? "" : newSign ? newImpact : -newImpact}
          onChange={(e) => {
            const value = e.target.value;
            console.log(value);
            if (value === "") {
              setNewImpact(null);
            } else {
              setNewImpact(Math.abs(Number(value)));
              setNewSign(Number(value) >= 0);
            }
          }}
          placeholder="ارزش"
        />
        <CButton
          type="button"
          onClick={() => {
            if (newFactorId !== undefined && newImpact !== null) {
              onAddFactor({
                factorId: newFactorId,
                impact: newImpact,
                plus: newSign,
              });
              setNewImpact(null);
            }
          }}
        >
          +
        </CButton>
      </div>
    </CForm>
  );
}
