"use client";
import Sidebar from "../components/dashboard/Sidebar";
import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="fixed h-screen">
        <Sidebar />
      </div>
      <div className="mr-80 h-screen p-8 main">{children}</div>
    </div>
  );
}
