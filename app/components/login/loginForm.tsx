import React, { useState, useEffect, useRef } from "react";
import {
  CForm,
  CFormInput,
  CButton,
  CInputGroup,
  CInputGroupText,
  CCallout,
  CFormFloating,
  CFormLabel,
  CSpinner,
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
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [callout, setCallout] = useState("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    const status = await LoginApi({ username, password });

    if (status === 200) {
      const role = sessionStorage.getItem("role");
      if (role === "USER") {
        router.push("/dashboard");
      } else if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (role === "SUPER_ADMIN") {
        router.push("/superadmin/dashboard");
      }
    } else if (status === 401 || status === 422) {
      setCallout("نام کاربری یا رمز عبور اشتباه می باشد.");
    } else {
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents form submission when pressing Enter
      handleLogin(); // Calls the login function
    }
  };

  return (
    <CForm
      className="login-form"
      onKeyPress={handleKeyPress}
    >
      <h3>ورود به سامانه</h3>

      <div className="label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
          ></path>
        </svg>
        نام کاربری:
      </div>
      <CFormInput
        placeholder=""
        id="username"
        type="text"
        ref={usernameRef}
        onChange={(e) => {
          setUsername(e.target.value);
          setCallout("");
        }}
      />

      <div className="label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7 15q1.25 0 2.125-.875T10 12t-.875-2.125T7 9t-2.125.875T4 12t.875 2.125T7 15m0 3q-2.5 0-4.25-1.75T1 12t1.75-4.25T7 6q2.025 0 3.538 1.15T12.65 10h8.375L23 11.975l-3.5 4L17 14l-2 2l-2-2h-.35q-.625 1.8-2.175 2.9T7 18"
          ></path>
        </svg>
        رمز عبور:
      </div>
      <CFormInput
        className="password"
        id="password"
        type="password"
        value={password}
        placeholder=""
        onChange={(e) => {
          setPassword(e.target.value);
          setCallout("");
        }}
        ref={passwordRef}
      />

      {callout && <CCallout color="danger">{callout}</CCallout>}
      <CButton
        className="form-button"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <CSpinner />
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
              ></path>
            </svg>
            ورود
          </>
        )}
      </CButton>
      <p className="copy">
        کلیه حقوق این سامانه برای پژوهشکده سرمایه انسانی دانشگاه فرماندهی و ستاد
        آجا محفوظ است و هرگونه کپی برداری پیگرد قانونی دارد!
      </p>
      <div className="form-signup">
        حساب کاربری ندارید؟
        <Link href={"/signup"}>ثبت نام کنید</Link>
      </div>
    </CForm>
  );
}
