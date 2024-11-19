import { CModal, CButton, CCallout } from "@coreui/react";
import { CLoadingButton } from "@coreui/react-pro";
import "./DeleteExam.css";
import { useState } from "react";
import putExam from "@/app/api/putExam";

interface Props {
  visible: boolean;
  setVisible: Function;
  id: number;
}

export default function ActiveExamWarnig(inputProps: Props) {
  const [isSending, setIsSending] = useState(false);
  const [callout, setCallout] = useState("");

  const handleActive = async () => {
    setIsSending(true); // Start loading state
    try {
      const exam = { isActive: true }; // Update the exam object
      const responseStatus = await putExam({ id: inputProps.id, exam }); // Call the API
      if (responseStatus === 200) {
        // Success, you can show a success message or handle accordingly
        setCallout("آزمون با موفقیت فعال شد.");
        inputProps.setVisible(false);
      } else {
        // Handle different error status codes
        setCallout("خطایی رخ داد، لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      setCallout("ارتباط با سرور برقرار نشد."); // Handle general errors
    } finally {
      setIsSending(false); // Stop loading state
    }
  };

  return (
    <CModal
      visible={inputProps.visible}
      alignment="center"
      onClose={() => inputProps.setVisible(false)}
      aria-labelledby="delete-survey-modal"
      keyboard
    >
      <div className="container">
        <div className="delete-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M449.07 399.08L278.64 82.58c-12.08-22.44-44.26-22.44-56.35 0L51.87 399.08A32 32 0 0 0 80 446.25h340.89a32 32 0 0 0 28.18-47.17m-198.6-1.83a20 20 0 1 1 20-20a20 20 0 0 1-20 20m21.72-201.15l-5.74 122a16 16 0 0 1-32 0l-5.74-121.95a21.73 21.73 0 0 1 21.5-22.69h.21a21.74 21.74 0 0 1 21.73 22.7Z"
            ></path>
          </svg>
          <div className="text">فعال سازی آزمون</div>
        </div>
        <div className="ensure-text">
          با فعالسازی آزمون، امکان حدف، ویرایش و غیر فعالسازی مجدد آزمون ممکن
          نمی باشد
        </div>
        {callout && <CCallout>{callout}</CCallout>}
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
            onClick={handleActive}
          >
            فعال سازی
          </CLoadingButton>
        </div>
      </div>
    </CModal>
  );
}
