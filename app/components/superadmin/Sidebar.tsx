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
    href: "/superadmin/dashboard",
  },
  {
    text: "ادمین ها",
    icon: (
      <path
        fill="currentColor"
        d="M10 9.25c-2.27 0-2.73-3.44-2.73-3.44C7 4.02 7.82 2 9.97 2c2.16 0 2.98 2.02 2.71 3.81c0 0-.41 3.44-2.68 3.44m0 2.57L12.72 10c2.39 0 4.52 2.33 4.52 4.53v2.49s-3.65 1.13-7.24 1.13c-3.65 0-7.24-1.13-7.24-1.13v-2.49c0-2.25 1.94-4.48 4.47-4.48z"
      ></path>
    ),
    href: "/superadmin/dashboard/admins",
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
          src={Logo}
          alt="لوگو"
          width={90}
          height={90}
        />
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
