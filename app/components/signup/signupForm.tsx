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
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [identity_code, setIdentityCode] = useState("");
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
    const status = await SignupApi({
      first_name,
      last_name,
      phone_number,
      username,
      email,
      password,
      identity_code,
    });

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
      <div className="name-input">
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
      </div>
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
      <CInputGroup className="mb-3 password-input">
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
      <CFormInput
        className="normal-input"
        id="identitycode"
        type="text"
        placeholder="کد شناسایی"
        onChange={(e) => {
          setIdentityCode(e.target.value);
          setCallout("");
        }}
      />
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
