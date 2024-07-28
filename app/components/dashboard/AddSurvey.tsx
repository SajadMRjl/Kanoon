import { useState, useRef } from "react";
import {
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
  CFormTextarea,
  CModal,
  CCallout,
} from "@coreui/react";
import { CDatePicker, CLoadingButton } from "@coreui/react-pro";
import postSurvey, { Survey } from "@/app/api/postSurvey";
import "./AddSurvey.css";

interface Props {
  visible: boolean;
  setVisible: Function;
}

export default function AddSurvey({ visible, setVisible }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isViableJustByAuthor, setIsViableJustByAutho] = useState(false);

  const [callout, setCallout] = useState("");
  const [isSending, setIsSending] = useState(false);

  const titleRef = useRef(null);

  const handleConfirm = async () => {
    if (!startTime || !endTime) {
      setCallout("زمان شروع و پایان بدون مقدار می باشد");
      return;
    }

    const survey: Survey = {
      title,
      description,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      isPublic: !isPrivate,
      viewableByAuthorOnly: isViableJustByAuthor,
    };

    try {
      setIsSending(true);
      const status = await postSurvey(survey);
      if (status === 200) {
        setVisible(false);
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
      visible={visible}
      alignment="center"
      onClose={() => setVisible(false)}
      aria-labelledby="add-survey-modal"
      className="modal"
    >
      <CForm className="form">
        <div className="form-header">
          <h2>افزودن پرسشنامه</h2>
          <CButton
            type="button"
            variant="ghost"
            onClick={() => setVisible(false)}
          >
            انصراف
          </CButton>
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
          <div className="form-date">
            <CDatePicker
              firstDayOfWeek={6}
              placeholder="زمان شروع"
              required
              todayButton="امروز"
              locale="fa-IR"
              timepicker
              cleaner
              closeOnSelect
              cancelButton="بستن"
              confirmButton="تایید"
              onDateChange={(value: Date) => setStartTime(value)}
            />
            <CDatePicker
              placeholder="زمان پایان"
              required
              todayButton="امروز"
              locale="fa-IR"
              timepicker
              cleaner
              closeOnSelect
              cancelButton="بستن"
              confirmButton="تایید"
              onDateChange={(value: Date) => setEndTime(value)}
            />
          </div>
          <div className="form-checkbox">
            <CFormCheck
              id="is-public"
              label="عمومی"
              reverse
              checked={!isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
            />
            <CFormCheck
              id="viewable-by-author"
              label="فقط توسط من قابل مشاهده باشد"
              reverse
              checked={isViableJustByAuthor}
              onChange={() => setIsViableJustByAutho(!isViableJustByAuthor)}
            />
          </div>
          {callout && <CCallout color="danger">{callout}</CCallout>}
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
        </div>
      </CForm>
    </CModal>
  );
}
