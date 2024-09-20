import { useState, useRef } from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CModal,
  CCallout,
} from "@coreui/react";
import { CLoadingButton } from "@coreui/react-pro";
import postSurvey, { Survey } from "@/app/api/postSurvey";
import "./AddSurvey.css";

interface Props {
  visible: boolean;
  setVisible: Function;
}

export default function AddSurvey({ visible, setVisible }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [callout, setCallout] = useState("");
  const [isSending, setIsSending] = useState(false);

  const titleRef = useRef(null);

  const handleConfirm = async () => {
    const survey: Survey = {
      title,
      description,
    };

    try {
      setIsSending(true);
      const status = await postSurvey(survey);
      if (status === 200) {
        setVisible(false);
      } else if (status === 401) {
        setCallout(`خطا در ارسال اطلاعات \nلطفا مجددا وارد شوید`);
      } else if (status === 403) {
        setCallout("شما دسترسی لازم برای ایجاد پرسشنامه را ندارید.");
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
      visible={visible}
      alignment="center"
      onClose={() => setVisible(false)}
      aria-labelledby="add-survey-modal"
      className="modal"
    >
      <CForm className="form">
        <div className="form-header">
          <h2>افزودن پرسشنامه</h2>
        </div>
        <div className="form-inputs">
          <CFormInput
            id="title"
            ref={titleRef}
            type="text"
            placeholder="عنوان"
            onChange={(e) => {
              setTitle(e.target.value);
              setCallout("");
            }}
          />
          <CFormTextarea
            id="description"
            rows={4}
            placeholder="توضیحات"
            onChange={(e) => {
              setDescription(e.target.value);
              setCallout("");
            }}
          />

          {callout && <CCallout color="danger">{callout}</CCallout>}
        </div>

        <div className="form-actions">
          <CButton
            type="button"
            variant="outline"
            className="cancel-btn"
            onClick={() => setVisible(false)}
          >
            انصراف
          </CButton>
          <CLoadingButton
            loading={isSending}
            disabledOnLoading
            type="button"
            variant="outline"
            className="confirm-btn"
            onClick={handleConfirm}
          >
            افزودن
          </CLoadingButton>
        </div>
      </CForm>
    </CModal>
  );
}
