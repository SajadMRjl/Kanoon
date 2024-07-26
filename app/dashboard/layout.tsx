"use client";
import Sidebar from "../components/dashboard/Sidebar";
import "./layout.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">{children}</div>
    </div>
  );
}
