"use client";

import { FaExclamationTriangle } from "react-icons/fa";
import { CButton } from "@coreui/react";

export default function Unauthorized() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <FaExclamationTriangle className="text-red-600 text-6xl" />

      <h1 className="text-3xl font-bold">غیر مجاز</h1>
      <p className="text-lg mb-0">شما به این صفحه دسترسی ندارید.</p>
      <CButton
        type="button"
        href="/login"
        className="bg-black text-white "
      >
        صفحه ورود
      </CButton>
    </div>
  );
}
