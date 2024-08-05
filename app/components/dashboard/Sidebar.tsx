"use client";

import React, { useState, useEffect } from "react";
import {
  CSidebar,
  CSidebarNav,
  CSidebarHeader,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./Sidebar.css";
import { usePathname } from "next/navigation";
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
    text: "پرسشنامه ها",
    icon: (
      <path
        fill="currentColor"
        d="M8.813 0A1 1 0 0 0 8 1v1H4.406C3.606 2 3 2.606 3 3.406V24.5c0 .9.606 1.5 1.406 1.5H21.5c.8 0 1.406-.606 1.406-1.406V3.406c.1-.8-.512-1.406-1.312-1.406H18V1a1 1 0 0 0-1-1H9a1 1 0 0 0-.094 0a1 1 0 0 0-.094 0zM10 2h6v2h-6zM5 4h3v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4h3v20H5zm2 5v4h4V9zm1 1h2v2H8zm5 0v2h6v-2zm-6 5v4h4v-4zm6 1v2h6v-2z"
      ></path>
    ),
    href: "/dashboard/surveys",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
        <h4>لوگو</h4>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"
            ></path>
          </svg>
          {/* Implement your popover menu here */}
        </div>
      </div>
    </CSidebar>
  );
};

export default Sidebar;
