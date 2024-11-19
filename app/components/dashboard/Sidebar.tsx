"use client";

import React, { useState, useEffect } from "react";
import {
  CSidebar,
  CSidebarNav,
  CSidebarHeader,
  CNavItem,
  CNavLink,
  CButton,
} from "@coreui/react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./Sidebar.css";
import { usePathname, useRouter } from "next/navigation";
import getMe, { User } from "@/app/api/getMe";

const links = [
  {
    text: "پیشخوان",
    icon: (
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.557 2.75H4.682A1.932 1.932 0 0 0 2.75 4.682v3.875a1.942 1.942 0 0 0 1.932 1.942h3.875a1.942 1.942 0 0 0 1.942-1.942V4.682A1.942 1.942 0 0 0 8.557 2.75m10.761 0h-3.875a1.942 1.942 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.942 1.942 0 0 0 1.932-1.942V4.682a1.932 1.932 0 0 0-1.932-1.932m0 10.75h-3.875a1.942 1.942 0 0 0-1.942 1.933v3.875a1.942 1.942 0 0 0 1.942 1.942h3.875a1.942 1.942 0 0 0 1.932-1.942v-3.875a1.932 1.932 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.932 1.932 0 0 0 1.932 1.932h3.875a1.942 1.942 0 0 0 1.942-1.932v-3.875a1.942 1.942 0 0 0-1.942-1.942"
      ></path>
    ),
    href: "/dashboard",
  },
  {
    text: "آزمون ها",
    icon: (
      <path
        fill="currentColor"
        d="M14 15q.425 0 .738-.312t.312-.738t-.312-.737T14 12.9t-.737.313t-.313.737t.313.738T14 15m-.75-3.2h1.5q0-.725.15-1.062t.7-.888q.75-.75 1-1.212t.25-1.088q0-1.125-.788-1.837T14 5q-1.025 0-1.787.575T11.15 7.1l1.35.55q.225-.625.613-.937T14 6.4q.6 0 .975.338t.375.912q0 .35-.2.663t-.7.787q-.825.725-1.012 1.138T13.25 11.8M8 18q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm0-2h12V4H8zm-4 6q-.825 0-1.412-.587T2 20V6h2v14h14v2zM8 4v12z"
      ></path>
    ),
    href: "/dashboard/exams",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      const response = await getMe();
      if (typeof response === "number") {
        console.log("error");
      } else {
        setName(response.first_name + " " + response.last_name);
        setEmail(response.email);
      }
    };
    fetchMe();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <CSidebar>
      <CSidebarHeader>
        <Image
          src={Logo}
          alt="لوگو"
          width={90}
          height={90}
        />
        <h2>سامانه آزمون ساز پژوهشکده سرمایه انسانی</h2>
      </CSidebarHeader>
      <CSidebarNav>
        {links.map((link) => {
          return (
            <CNavItem key={link.text}>
              <CNavLink
                href={link.href}
                className={pathname === link.href ? "nav-link-active" : ""}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 26 26"
                >
                  {link.icon}
                </svg>
                <div className="nav-text">{link.text}</div>
              </CNavLink>
            </CNavItem>
          );
        })}
      </CSidebarNav>
      <div className="sidebar-footer">
        <div className="user-info">
          <p>{name}</p>
          <div>{email}</div>
        </div>
        <div className="popover-menu">
          <CButton onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
              ></path>
            </svg>
          </CButton>
        </div>
      </div>
    </CSidebar>
  );
};

export default Sidebar;
