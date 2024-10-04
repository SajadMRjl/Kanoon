"use client";

import React, { useState, useEffect } from "react";
import {
  CSidebar,
  CSidebarNav,
  CSidebarHeader,
  CNavItem,
  CNavLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton,
} from "@coreui/react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./Sidebar.css";
import { usePathname } from "next/navigation";
import getMe, { User } from "@/app/api/getMe";
import { useRouter } from "next/navigation";

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
    href: "/admin/dashboard",
  },
  {
    text: "پرسشنامه ها",
    icon: (
      <path
        fill="currentColor"
        d="M8.813 0A1 1 0 0 0 8 1v1H4.406C3.606 2 3 2.606 3 3.406V24.5c0 .9.606 1.5 1.406 1.5H21.5c.8 0 1.406-.606 1.406-1.406V3.406c.1-.8-.512-1.406-1.312-1.406H18V1a1 1 0 0 0-1-1H9a1 1 0 0 0-.094 0a1 1 0 0 0-.094 0zM10 2h6v2h-6zM5 4h3v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4h3v20H5zm2 5v4h4V9zm1 1h2v2H8zm5 0v2h6v-2zm-6 5v4h4v-4zm6 1v2h6v-2z"
      ></path>
    ),
    href: "/admin/dashboard/surveys",
  },
  {
    text: "آزمون ها",
    icon: (
      <path
        fill="currentColor"
        d="M14 15q.425 0 .738-.312t.312-.738t-.312-.737T14 12.9t-.737.313t-.313.737t.313.738T14 15m-.75-3.2h1.5q0-.725.15-1.062t.7-.888q.75-.75 1-1.212t.25-1.088q0-1.125-.788-1.837T14 5q-1.025 0-1.787.575T11.15 7.1l1.35.55q.225-.625.613-.937T14 6.4q.6 0 .975.338t.375.912q0 .35-.2.663t-.7.787q-.825.725-1.012 1.138T13.25 11.8M8 18q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm0-2h12V4H8zm-4 6q-.825 0-1.412-.587T2 20V6h2v14h14v2zM8 4v12z"
      ></path>
    ),
    href: "/admin/dashboard/exams",
  },
  {
    text: "مدیریت برگزاری آزمون",
    icon: (
      <path
        fill="currentColor"
        d="M8.143 6.307c.434-.232.901-.306 1.356-.306c.526 0 1.138.173 1.631.577c.518.424.869 1.074.869 1.922c0 .975-.689 1.504-1.077 1.802l-.085.066c-.424.333-.588.511-.588.882a.75.75 0 1 1-1.5 0c0-1.134.711-1.708 1.162-2.062c.513-.403.588-.493.588-.688c0-.397-.149-.622-.32-.761A1.1 1.1 0 0 0 9.5 7.5c-.295 0-.498.049-.65.13c-.143.076-.294.21-.44.48a.75.75 0 0 1-1.32-.715c.264-.486.612-.853 1.054-1.089M9.499 15a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0-12a7.5 7.5 0 0 0-6.797 10.673l-.725 2.842a1.25 1.25 0 0 0 1.504 1.524c.75-.18 1.903-.457 2.931-.702A7.5 7.5 0 1 0 9.499 3m-6 7.5a6 6 0 1 1 3.33 5.375l-.243-.121l-.265.063l-2.788.667c.2-.78.462-1.812.69-2.708l.07-.276l-.13-.253A6 6 0 0 1 3.5 10.5m11 10.5a7.48 7.48 0 0 1-5.1-2h.1c.718 0 1.415-.089 2.081-.257c.864.482 1.86.757 2.92.757c.96 0 1.866-.225 2.67-.625l.242-.121l.265.063c.922.22 1.965.445 2.74.61a158 158 0 0 0-.642-2.651l-.07-.276l.13-.253A6 6 0 0 0 20.5 13.5a6 6 0 0 0-2.747-5.042a8.4 8.4 0 0 0-.8-2.047a7.503 7.503 0 0 1 4.344 10.263c.253 1.008.51 2.1.672 2.803a1.244 1.244 0 0 1-1.468 1.5a133 133 0 0 1-2.913-.64A7.5 7.5 0 0 1 14.5 21"
      ></path>
    ),
    href: "/admin/dashboard/exam-session",
  },
  {
    text: "نتایج آزمون",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.2em"
        height="1.2em"
        viewBox="0 0 2048 2048"
      >
        <path
          fill="currentColor"
          d="M2048 128v1408H704l-448 448v-448H0V128zm-421 429l-136-136l-659 659l-275-275l-136 136l411 411z"
        ></path>
      </svg>
    ),
    href: "/admin/dashboard/responses",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/login");
  };

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

  return (
    <CSidebar>
      <CSidebarHeader>
        <Image
          className="logo"
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
