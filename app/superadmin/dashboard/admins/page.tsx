"use client";

import "./page.css";
import { CButton } from "@coreui/react";
import { useState } from "react";
import AdminTable from "@/app/components/superadmin/admins/AdminTable";
import AddAdmin from "@/app/components/superadmin/admins/AddAdmin";

export default function Page() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="page">
      <div className="w-full">
        <h2 className="page-header">ادمین ها</h2>
        <AdminTable newVisible={visible} />
      </div>
      <CButton
        className="add-exam-btn"
        type="button"
        color="secondary"
        onClick={() => setVisible(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <circle
              cx={12}
              cy={12}
              r={10}
            ></circle>
            <path
              strokeLinecap="round"
              d="M15 12h-3m0 0H9m3 0V9m0 3v3"
            ></path>
          </g>
        </svg>
        افزودن ادمین
      </CButton>
      <AddAdmin
        setVisible={setVisible}
        visible={visible}
      />
    </div>
  );
}
