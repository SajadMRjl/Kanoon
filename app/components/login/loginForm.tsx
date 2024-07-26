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
import { cilUser, cilLockLocked } from "@coreui/icons";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "./loginForm.css";
import LoginApi from "@/app/api/login";
import Link from "next/link";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [callout, setCallout] = useState("");

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    const status = await LoginApi({ username, password });

    if (status === 200) {
      // navigate to dashboard
      console.log("dashboard");
    } else if (status === 401 || status === 422) {
      setCallout("نام کاربری یا رمز عبور اشتباه می باشد.");
    } else {
      // fail to connect to server
      setCallout("خطا در برقراری ارتباط با سرور.");
    }

    setIsLoading(false);
  };

  const handleTogglePasswordVisibility = () => {
    const passwordInput = passwordRef.current;
    const cursorPosition = passwordInput.selectionStart;
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setTimeout(() => {
      passwordInput.setSelectionRange(cursorPosition, cursorPosition);
      passwordInput.focus();
    }, 0);
  };

  return (
    <CForm className="form">
      <h2>ورود</h2>
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
            setCallout("");
          }}
          dir={password ? "ltr" : "rtl"}
          ref={passwordRef}
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
      <Link
        className="forget-pass"
        href={"#"}
      >
        رمزعبور را فراموش کرده اید؟
      </Link>
      {callout && <CCallout color="danger">{callout}</CCallout>}
      <CLoadingButton
        className="form-button"
        onClick={handleLogin}
        loading={isLoading}
        disabledOnLoading
        disabled={!password || !username}
      >
        ورود
      </CLoadingButton>
      <div className="form-signup">
        حساب کاربری ندارید؟
        <Link href={"/signup"}>ثبت نام کنید</Link>
      </div>
    </CForm>
  );
}
