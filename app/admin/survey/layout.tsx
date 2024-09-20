"use client";

import { CHeader, CButton } from "@coreui/react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CHeader>
        <Image
          src={Logo}
          alt="لوگو"
          width={50}
          height={50}
        />
        <CButton
          variant="outline"
          type="button"
          href="/admin/dashboard"
          className="dashboard-btn px-4 py-2 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="m2.87 7.75l1.97 1.97a.75.75 0 1 1-1.06 1.06L.53 7.53L0 7l.53-.53l3.25-3.25a.75.75 0 0 1 1.06 1.06L2.87 6.25h9.88a3.25 3.25 0 0 1 0 6.5h-2a.75.75 0 0 1 0-1.5h2a1.75 1.75 0 1 0 0-3.5z"
              clipRule="evenodd"
            ></path>
          </svg>
          بازگشت به داشبورد
        </CButton>
      </CHeader>
      <div className="main">{children}</div>
    </div>
  );
}
