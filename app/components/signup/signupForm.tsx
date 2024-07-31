import React, { useState, useEffect, useRef } from "react";
import {
  CForm,
  CFormInput,
  CButton,
  CInputGroup,
  CInputGroupText,
  CCallout,
} from "@coreui/react";
import { CLoadingButton } from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilUser, cilLockLocked, cilAt } from "@coreui/icons";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "./signupForm.css";
import SignupApi from "@/app/api/signup";
import Link from "next/link";
import { ValidateEmail, ValidatePassword } from "../validation";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [callout, setCallout] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (usernameRef.current) usernameRef.current.focus();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    const status = await SignupApi({ username, email, password });

    if (status === 200) {
      router.push("/dashboard");
    } else if (status === 401) {
      setCallout("نام");
    } else if (status === 500) {
    } else {
      // fail to connect to server
      setCallout("خطا در برقراری ارتباط با سرور.");
    }

    setIsLoading(false);
  };

  const handleTogglePasswordVisibility = () => {
    const passwordInput = passwordRef.current;
    const cursorPosition = passwordInput?.selectionStart;
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setTimeout(() => {
      if (passwordInput && cursorPosition) {
        passwordInput.setSelectionRange(cursorPosition, cursorPosition);
        passwordInput.focus();
      }
    }, 0);
  };

  return (
    <CForm className="form">
      <h2>ثبت نام</h2>
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon={cilUser} />
        </CInputGroupText>
        <CFormInput
          id="username"
          ref={usernameRef}
          type="text"
          placeholder="نام کاربری"
          onChange={(e) => {
            setUsername(e.target.value);
            setCallout("");
          }}
          dir={username ? "ltr" : "rtl"}
        />
      </CInputGroup>
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon={cilAt} />
        </CInputGroupText>
        <CFormInput
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
      </CInputGroup>
      <CInputGroup className="mb-3 password-input">
        <CInputGroupText>
          <CIcon icon={cilLockLocked} />
        </CInputGroupText>
        <CFormInput
          className="password"
          id="password"
          type={showPassword ? "text" : "password"}
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
          feedbackInvalid="رمزعبور معتبر نمی باشد."
        />
        <CButton
          type="button"
          className="show-pass"
          onClick={handleTogglePasswordVisibility}
          onMouseDown={(e) => e.preventDefault()}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </CButton>
      </CInputGroup>
      {callout && <CCallout color="danger">{callout}</CCallout>}
      <CLoadingButton
        className="form-button"
        onClick={handleLogin}
        loading={isLoading}
        disabledOnLoading
        disabled={!username || !password || !email}
      >
        ثبت نام
      </CLoadingButton>
      <div className="form-signup">
        قبلا ثبت نام کرده اید؟
        <Link href={"/login"}>وارد شوید</Link>
      </div>
    </CForm>
  );
}
