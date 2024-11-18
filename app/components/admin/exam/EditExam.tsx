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
import { Exam as PostExam } from "@/app/api/postExam";
import { Exam as GetExam } from "@/app/api/getExam";

import getSurveyList, { Survey } from "@/app/api/getSurveyList";
import getExam from "@/app/api/getExam";
import putExam, { ExamSurvey } from "@/app/api/putExam";

interface Props {
  visible: boolean;
  setVisible: Function;
  id: number;
}

export default function EditExam({ visible, setVisible, id }: Props) {
  const [exam, setExam] = useState<GetExam>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [viewableByAuthorOnly, setViewableByAuthorOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [surveyList, setSurveyList] = useState<any[]>([]); // Modified to allow options with 'selected' property
  const [selectedSurveys, setSelectedSurveys] = useState<ExamSurvey[]>([]);

  const [callout, setCallout] = useState("");
  const [isSending, setIsSending] = useState(false);

  const titleRef = useRef(null);

  useEffect(() => {
    const fetchSurveyList = async () => {
      try {
        setIsLoading(true);
        const response = await getSurveyList();
        if (Array.isArray(response)) {
          const modifiedSurveyList = response.map((survey) => ({
            value: survey.id,
            label: survey.title,
            selected: exam?.examSurveys?.some(
              (examSurvey) => examSurvey.surveyId === survey.id
            ),
            id: exam?.examSurveys?.some(
              (examSurvey) => examSurvey.surveyId === survey.id
            ),
          }));
          setSurveyList(modifiedSurveyList);
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
  }, [exam]);

  useEffect(() => {
    const fetchExam = async () => {
      const exam = await getExam({ exam_id: id });
      if (typeof exam !== "number") {
        setExam(exam);
        setTitle(exam.title);
        setDescription(exam.description);
        setIsActive(exam.isActive);
        setIsPublic(exam.isPublic);
      }
    };
    if (visible) fetchExam();
  }, [visible, id]);

  useEffect(() => {
    console.log(surveyList);
  }, [surveyList]);

  const handleConfirm = async () => {
    const selectedSurveys = surveyList
      .filter((survey) => survey.selected) // Only keep surveys with 'selected' = true
      .map((survey, index) => {
        return { surveyId: survey.value, order: index }; // Ensure proper mapping
      });
    const exam: PostExam = {
      title,
      description,
      isPublic,
      isActive,
      viewableByAuthorOnly,
      examSurveys: selectedSurveys,
    };

    try {
      setIsSending(true);
      const status = await putExam({ exam: exam, id: id });
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

  const handleSurveyChange = (selected: any) => {
    const updatedSurveyList = surveyList.map((survey) => ({
      ...survey,
      selected: selected.some((item: any) => item.value === survey.value),
    }));
    setSurveyList(updatedSurveyList);
  };

  return (
    <CModal
      visible={visible}
      alignment="center"
      onClose={() => setVisible(false)}
      aria-labelledby="add-survey-modal"
      className="modal"
      keyboard
    >
      <CForm className="form">
        <div className="form-header">
          <h2>ویرایش آزمون</h2>
        </div>
        <div className="form-inputs">
          <CFormInput
            id="title"
            ref={titleRef}
            type="text"
            value={title}
            placeholder="عنوان"
            onChange={(e) => {
              setTitle(e.target.value);
              setCallout("");
            }}
          />
          <CFormTextarea
            id="description"
            value={description}
            maxLength={200}
            rows={4}
            placeholder="توضیحات"
            onChange={(e) => {
              setDescription(e.target.value);
              setCallout("");
            }}
          />
          <CMultiSelect
            allowCreateOptions
            loading={isLoading}
            className="survey-select"
            placeholder="پرسشنامه ها"
            options={surveyList}
            selectAll={false}
            onChange={handleSurveyChange}
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
            ویرایش
          </CLoadingButton>
        </div>
      </CForm>
    </CModal>
  );
}
