"use client";

import Image from "next/image";
import LoginPic from "@/public/login.png";
import LoginForm from "../components/login/loginForm";
import "./page.css";

export default function Page() {
  return (
    <div className="login-page">
      <Image
        className="login-picture"
        src={LoginPic}
        alt="صفحه لاگین"
        width={600}
        height={600}
      />
      <LoginForm />
    </div>
  );
}
