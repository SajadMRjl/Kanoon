import { useState, useRef, useEffect } from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CModal,
  CCallout,
  CFormCheck,
} from "@coreui/react";
import { CLoadingButton, CMultiSelect } from "@coreui/react-pro";
import postExam, { Exam } from "@/app/api/postExam";
import getSurveyList, { Survey } from "@/app/api/getSurveyList";
import "./AddExam.css";

interface Props {
  visible: boolean;
  setVisible: Function;
}

export default function AddExam({ visible, setVisible }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [viewableByAuthorOnly, setViewableByAuthorOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [surveyList, setSurveyList] = useState<Survey[]>([]);
  const [selectedSurveys, setSelectedSurveys] = useState<Survey[]>([]);

  const [callout, setCallout] = useState("");
  const [isSending, setIsSending] = useState(false);

  const titleRef = useRef(null);

  useEffect(() => {
    const fetchSurveyList = async () => {
      try {
        setIsLoading(true);
        const response = await getSurveyList();
        if (Array.isArray(response)) {
          setSurveyList(response);
        }
      } catch (error) {
        setCallout("خطا در دریافت لیست پرسشنامه‌ها");
      } finally {
        setIsLoading(false);
      }
    };

    if (visible) {
      fetchSurveyList();
    }
  }, [visible]);

  const handleConfirm = async () => {
    const exam: Exam = {
      title,
      description,
      isPublic,
      isActive,
      viewableByAuthorOnly,
      examSurveys: selectedSurveys.map((survey, index) => {
        return { surveyId: survey.id, order: index };
      }),
    };

    try {
      setIsSending(true);
      const status = await postExam(exam);
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
          <h2>افزودن آزمون</h2>
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
          <CMultiSelect
            loading={isLoading}
            placeholder="پرسشنامه ها"
            className="survey-select"
            options={surveyList.map((survey) => ({
              label: survey.title,
              value: survey.id,
              survey,
            }))}
            selectAll={false}
            onChange={(selected) => {
              const surveys = selected.map((item: any) => item.survey);
              setSelectedSurveys(surveys);
            }}
          />

          <div className="form-checkbox">
            <CFormCheck
              id="is-public"
              label="خصوصی"
              reverse
              checked={!isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <CFormCheck
              id="is-active"
              label="فعال"
              reverse
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            <CFormCheck
              id="viewable-by-author"
              label="نتیجه آزمون قابل مشاهده باشد"
              reverse
              checked={!viewableByAuthorOnly}
              onChange={() => setViewableByAuthorOnly(!viewableByAuthorOnly)}
            />
          </div>

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
