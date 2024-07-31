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
import { CDatePicker, CLoadingButton } from "@coreui/react-pro";
import "./AddSurvey.css";
import moment from "jalali-moment";
import putSurvey from "@/app/api/putSurvey";
import getSurvey, { Survey } from "@/app/api/getSurvey";

interface Props {
  visible: boolean;
  setVisible: Function;
  id: number;
}

const convertToPersianDate = (timeString: string): string => {
  return moment(timeString).locale("fa").format("YYYY/MM/DD HH:mm:ss");
};

export default function EditSurvey(inputProps: Props) {
  const [survey, setSurvey] = useState<Survey | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isViableJustByAuthor, setIsViableJustByAuthor] = useState(false);
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
          setStartTime(response.start_time);
          setEndTime(response.end_time);
          setIsPrivate(!response.isPublic);
          setIsViableJustByAuthor(response.viewableByAuthorOnly);
        }
      }
    };
    fetchSurvey();
  }, [inputProps.id]);

  const handleConfirm = async () => {
    if (!startTime || !endTime) {
      setCallout("زمان شروع و پایان بدون مقدار می باشد");
      return;
    }

    const editedSurvey: Survey = {
      id: inputProps.id,
      title,
      description,
      start_time: startTime,
      end_time: endTime,
      isPublic: !isPrivate,
      viewableByAuthorOnly: isViableJustByAuthor,
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
    >
      <CForm className="form">
        <div className="form-header">
          <h2>ویرایش پرسشنامه</h2>
          <CButton
            type="button"
            variant="ghost"
            onClick={() => inputProps.setVisible(false)}
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
            value={description}
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
              onDateChange={(value: Date | null) =>
                setStartTime(value?.toISOString() || "")
              }
              date={startTime}
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
              onDateChange={(value: Date | null) =>
                setEndTime(value?.toISOString() || "")
              }
              date={endTime}
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
              onChange={() => setIsViableJustByAuthor(!isViableJustByAuthor)}
            />
          </div>
          {callout && <CCallout color="danger">{callout}</CCallout>}
          <div className="form-actions">
            <CButton
              type="button"
              variant="outline"
              className="cancel-btn"
              onClick={() => inputProps.setVisible(false)}
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
              تایید
            </CLoadingButton>
          </div>
        </div>
      </CForm>
    </CModal>
  );
}
