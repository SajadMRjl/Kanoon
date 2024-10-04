import { useState, useRef, useEffect } from "react";
import { CButton, CForm, CFormInput, CModal, CCallout } from "@coreui/react";
import { CLoadingButton } from "@coreui/react-pro";
import "./AddAdmin.css";
import { ValidateEmail, ValidatePassword } from "@/app/components/validation";
import postAdmin, { User } from "@/app/api/postAdmin";

interface Props {
  visible: boolean;
  setVisible: Function;
}

export default function AddAdmin({ visible, setVisible }: Props) {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [identity_code, setIdentityCode] = useState("");
  const [password, setPassword] = useState("");
  const [callout, setCallout] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (usernameRef.current) usernameRef.current.focus();
  }, []);

  const handleConfirm = async () => {
    const admin: User = {
        username: username,
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        identity_code: identity_code,
    };

    try {
      setIsSending(true);
      const status = await postAdmin(admin);
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
      keyboard
    >
      <CForm className="form">
        <div className="form-header">
          <h2>افزودن ادمین</h2>
        </div>
        <div className="form-inputs">
          <CFormInput
            id="firstname"
            className="first-name"
            ref={usernameRef}
            type="text"
            placeholder="نام"
            onChange={(e) => {
              setFirstname(e.target.value);
              setCallout("");
            }}
          />
          <CFormInput
            className="last-name"
            id="lastname"
            type="text"
            placeholder="نام خانوادگی"
            onChange={(e) => {
              setLastname(e.target.value);
              setCallout("");
            }}
          />
          <CFormInput
            className="normal-input"
            id="username"
            type="text"
            placeholder="نام کاربری"
            onChange={(e) => {
              setUsername(e.target.value);
              setCallout("");
            }}
            dir={username ? "ltr" : "rtl"}
          />
          <CFormInput
            className="normal-input"
            id="phonenumber"
            type="number"
            placeholder="شماره موبایل"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setCallout("");
            }}
          />
          <CFormInput
            className="normal-input"
            id="email"
            type="email"
            placeholder="ایمیل"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(ValidateEmail(email));
              setCallout("");
            }}
            dir={email ? "ltr" : "rtl"}
            invalid={!emailError}
            feedbackInvalid="ایمیل معتبر نمی باشد."
          />
          <CFormInput
            className="normal-input"
            id="identitycode"
            type="number"
            placeholder="کد ملی"
            onChange={(e) => {
              setIdentityCode(e.target.value);
              setCallout("");
            }}
          />
          <CFormInput
            className="password"
            id="password"
            type="text"
            value={password}
            placeholder="رمز عبور"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(ValidatePassword(password));
              setCallout("");
            }}
            dir={password ? "ltr" : "rtl"}
            ref={passwordRef}
            invalid={!passwordError}
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
            className="confirm-btn"
            onClick={handleConfirm}
            loading={isSending}
            disabledOnLoading
            disabled={
              !username ||
              !password ||
              !email ||
              !phone_number ||
              !identity_code ||
              !first_name ||
              !last_name
            }
          >
            افزودن
          </CLoadingButton>
        </div>
      </CForm>
    </CModal>
  );
}
