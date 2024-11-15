"use client";

import Image from "next/image";
import LogoRight from "@/public/logo.png";
import LogoLeft from "@/public/logo_left.webp";
import LoginForm from "../components/login/loginForm";
import "./page.css";

export default function Page() {
  return (
    <div className="login-page">
      <div className="logos">
        <Image
          className="fixed right-5 top-5"
          alt="لوگو پژوهشکده سرمایه انسانی"
          src={LogoRight}
          width={130}
        />
        <Image
          className="fixed left-5 top-5"
          alt="لوگو دانشگاه فرماندهی و ستادآجا"
          src={LogoLeft}
          width={130}
        />
      </div>
      <LoginForm />
    </div>
  );
}
