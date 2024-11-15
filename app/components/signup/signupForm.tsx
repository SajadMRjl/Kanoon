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
import {
  ValidateEmail,
  ValidateId,
  ValidatePassword,
  ValidatePhone,
} from "../validation";
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
  const [phoneError, setPhoneError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [idError, setIdError] = useState(true);

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

    if (status === "ثبت نام انجام شد") {
      router.push("/dashboard");
    } else {
      setCallout(status);
    }

    setIsLoading(false);
  };

  return (
    <CForm className="signup-form">
      <h3>ثبت نام</h3>
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
      />
      <CFormInput
        className="normal-input"
        id="phonenumber"
        type="number"
        placeholder="شماره موبایل"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
          setPhoneError(ValidatePhone(e.target.value));
          setCallout("");
        }}
        invalid={!phoneError}
      />
      {!phoneError && (
        <div className="invalid-feedback">شماره موبایل معتبر نمی باشد.</div>
      )}
      <CFormInput
        className="normal-input"
        id="email"
        type="email"
        placeholder="ایمیل"
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(ValidateEmail(e.target.value));
          setCallout("");
        }}
        dir={email ? "ltr" : "rtl"}
        invalid={!emailError}
      />
      {!emailError && (
        <div className="invalid-feedback">ایمیل معتبر نمی باشد.</div>
      )}
      <CFormInput
        className="normal-input"
        id="identitycode"
        type="number"
        placeholder="کد ملی"
        onChange={(e) => {
          setIdentityCode(e.target.value);
          setIdError(ValidateId(e.target.value));
          setCallout("");
        }}
        invalid={!idError}
      />
      {!idError && (
        <div className="invalid-feedback">کدملی معتبر نمی باشد.</div>
      )}
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
      {!passwordError && (
        <div className="invalid-feedback">
          رمز عبور باید حداقل ۸ کاراکتر باشد و شامل حروف کوچک و بزرگ، اعداد و یک
          کاراکتر خاص مانند !@#$%^&*.? باشد.
        </div>
      )}
      {callout && <CCallout color="danger">{callout}</CCallout>}
      <CLoadingButton
        className="form-button"
        onClick={handleLogin}
        loading={isLoading}
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
        ثبت نام
      </CLoadingButton>
      <div className="form-login">
        قبلا ثبت نام کرده اید؟
        <Link href={"/login"}>وارد شوید</Link>
      </div>
    </CForm>
  );
}
