import React from "react";
import {
  CSidebar,
  CSidebarNav,
  CSidebarHeader,
  CNavItem,
  CNavLink,
  CAvatar,
} from "@coreui/react";
import { cilHome, cilSettings, cilUser } from "@coreui/icons";
import "@coreui/coreui/dist/css/coreui.min.css";
import CIcon from "@coreui/icons-react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <CSidebar>
      <CSidebarHeader className="border-b-2">
        <h4>لوگو</h4>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavItem>
          <CNavLink href="/dashboard">
            <CIcon
              icon={cilHome}
              customClassName="nav-icon"
            />
            پیشخوان
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/dashboard/settings">
            <CIcon
              icon={cilSettings}
              customClassName="nav-icon"
            />
            تنظبمات
          </CNavLink>
        </CNavItem>
      </CSidebarNav>
      <div className="sidebar-footer">
        <CAvatar
          src="/path/to/avatar.jpg"
          size="lg"
        />
        <div className="user-info">
          <p>User Name</p>
          <div className="popover-menu">
            {/* Implement your popover menu here */}
          </div>
        </div>
      </div>
    </CSidebar>
  );
};

export default Sidebar;
