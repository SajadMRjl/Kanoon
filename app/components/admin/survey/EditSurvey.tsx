import { useState, useRef, useEffect } from "react";
import {
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
  CFormTextarea,
  CModal,
  CCallout,
} from "@coreui/react";
import { CLoadingButton } from "@coreui/react-pro";
import "./AddSurvey.css";
import putSurvey from "@/app/api/putSurvey";
import getSurvey, { Survey } from "@/app/api/getSurvey";

interface Props {
  visible: boolean;
  setVisible: Function;
  id: number;
}

export default function EditSurvey(inputProps: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [callout, setCallout] = useState("");
  const [isSending, setIsSending] = useState(false);

  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      if (inputProps.id !== -1) {
        const response = await getSurvey(inputProps.id);
        if (typeof response !== "number") {
          setTitle(response.title);
          setDescription(response.description);
        }
      }
    };
    fetchSurvey();
  }, [inputProps.id]);

  const handleConfirm = async () => {
    const editedSurvey: Survey = {
      title,
      description,
      id: inputProps.id,
    };

    try {
      setIsSending(true);
      const id = inputProps.id;
      const status = await putSurvey({ id, editedSurvey });
      if (status === 200) {
        inputProps.setVisible(false);
      } else if (status === 401) {
        setCallout(`خطا در ارسال اطلاعات \nلطفا مجددا وارد شوید`);
      } else {
        setCallout("خطا در برقراری ارتباط با سرور");
      }
    } catch (error) {
      setCallout("خطا در برقراری ارتباط با سرور");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <CModal
      visible={inputProps.visible}
      alignment="center"
      onClose={() => inputProps.setVisible(false)}
      aria-labelledby="add-survey-modal"
      className="modal"
      keyboard
    >
      <CForm className="form">
        <div className="form-header">
          <h2>ویرایش پرسشنامه</h2>
        </div>
        <div className="form-inputs">
          <CFormInput
            id="title"
            ref={titleRef}
            type="text"
            placeholder="عنوان"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setCallout("");
            }}
          />
          <CFormTextarea
            id="description"
            rows={4}
            placeholder="توضیحات"
            maxLength={200}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setCallout("");
            }}
          />
          {callout && <CCallout color="danger">{callout}</CCallout>}
          <div className="form-actions">
            <CButton
              type="button"
              color="secondary"
              className="cancel-btn"
              onClick={() => inputProps.setVisible(false)}
            >
              انصراف
            </CButton>
            <CLoadingButton
              loading={isSending}
              disabledOnLoading
              type="button"
              color="success"
              className="confirm-btn"
              onClick={handleConfirm}
            >
              تایید
            </CLoadingButton>
          </div>
        </div>
      </CForm>
    </CModal>
  );
}
