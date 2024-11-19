import { useState, useEffect } from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CModal,
  CCallout,
  CFormSelect,
  CFormCheck,
} from "@coreui/react";
import { CLoadingButton, CDatePicker } from "@coreui/react-pro";
import "./addExamSurvey.css";
import getAllExams, { Exam } from "@/app/api/getAllExams";
import postExamSession from "@/app/api/postExamSession";
import Tooltip from "@/app/components/Tooltip";

interface Props {
  visible: boolean;
  setVisible: Function;
}

export default function AddExamSession({ visible, setVisible }: Props) {
  const [callout, setCallout] = useState("");
  const [duration, setDuration] = useState<number>();
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timerOnQuestion, setTimerOnQuestion] = useState<boolean>(false);
  const [isSending, setIsSending] = useState(false);
  const [examId, setExamId] = useState<number>(-1);
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchExam = async () => {
      if (visible) {
        const response = await getAllExams();
        if (Array.isArray(response)) {
          setExams(response);
        } else {
          console.error(`Failed to fetch surveys: Status code ${response}`);
        }
      }
    };
    if (visible) fetchExam();
  }, [visible]);

  const validateForm = () => {
    if (!examId || !startTime || !endTime || (duration && duration <= 0)) {
      setCallout("لطفا تمام فیلدها را پر کنید");
      return false;
    }
    if (examId === -1) {
      setCallout("یک آزمون انتخاب کنید");
      return false;
    }
    if (startTime >= endTime) {
      setCallout("زمان شروع باید قبل از زمان پایان باشد");
      return false;
    }
    return true;
  };

  const handleConfirm = async () => {
    if (!validateForm()) return;

    setIsSending(true);
    try {
      const response = await postExamSession({
        exam_id: examId,
        start_time: startTime?.toISOString() || "",
        end_time: endTime?.toISOString() || "",
        duration: duration || 0,
        timerOnQuestion: timerOnQuestion,
      });

      if (response === 200) {
        handleClose();
      } else {
        setCallout("خطا در افزودن پرسشنامه");
      }
    } catch (error) {
      setCallout("خطایی رخ داد. لطفا دوباره تلاش کنید.");
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    setCallout("");
    setDuration(undefined);
    setEndTime(null);
    setStartTime(null);
    setTimerOnQuestion(false);
    setVisible(false);
    setExamId(-1);
  };

  return (
    <CModal
      visible={visible}
      alignment="center"
      onClose={handleClose}
      aria-labelledby="add-survey-modal"
      className="modal"
      keyboard
    >
      <CForm className="form">
        <div className="form-header">
          <h2>برگزاری آزمون جدید</h2>
        </div>
        <div className="form-inputs">
          <CFormSelect
            value={examId}
            onChange={(e) => setExamId(Number(e.target.value))}
            placeholder="انتخاب آزمون"
          >
            {exams.length === 0 && <option disabled>آزمونی وجود ندارد</option>}
            <option
              value={-1}
              disabled
            >
              آزمون ها
            </option>
            {exams.map((exam) => {
              return (
                <option
                  key={exam.id}
                  value={exam.id}
                >
                  {exam.title}
                </option>
              );
            })}
          </CFormSelect>
          <CFormInput
            id="duration"
            type="number"
            placeholder="مدت زمان آزمون (دقیقه)"
            value={duration}
            onChange={(e) => {
              setCallout("");
              setDuration(Number(e.target.value));
            }}
          />
          <div className="w-full flex gap-2 items-center">
            <CFormCheck
              label="زمان سوالات محدود باشد"
              reverse
              checked={timerOnQuestion}
              onChange={() => setTimerOnQuestion(!timerOnQuestion)}
            />
            <Tooltip content="مدت زمان آزمون به صورت مساوی بین تمام سوالات تقسیم می شود">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 16 16"
              >
                <g fill="currentColor">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
                  <path d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0"></path>
                </g>
              </svg>
            </Tooltip>
          </div>
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
              onDateChange={(value: Date | null) => {
                setCallout("");
                setStartTime(value);
              }}
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
              onDateChange={(value: Date | null) => {
                setCallout("");
                setEndTime(value);
              }}
            />
          </div>
          {callout && <CCallout color="danger">{callout}</CCallout>}
        </div>

        <div className="form-actions">
          <CButton
            type="button"
            color="secondary"
            className="cancel-btn"
            onClick={handleClose}
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
            افزودن
          </CLoadingButton>
        </div>
      </CForm>
    </CModal>
  );
}
