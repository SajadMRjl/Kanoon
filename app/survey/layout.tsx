"use client";

import { CBreadcrumb, CBreadcrumbItem, CHeader } from "@coreui/react";
import { usePathname, useParams } from "next/navigation";
import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { survey_id } = useParams();

  return (
    <div>
      <CHeader>
        <CBreadcrumb dir="ltr">
          <CBreadcrumbItem
            href={`/survey/${survey_id}/results`}
            active={pathname.includes(`/survey/${survey_id}/results`)}
          >
            نتایج
          </CBreadcrumbItem>
          <CBreadcrumbItem
            href={`/survey/${survey_id}/settings`}
            active={pathname.includes(`/survey/${survey_id}/settings`)}
          >
            تنظیمات
          </CBreadcrumbItem>
          <CBreadcrumbItem
            href={`/survey/${survey_id}/questions`}
            active={pathname.includes(`/survey/${survey_id}/questions`)}
          >
            سوالات
          </CBreadcrumbItem>
        </CBreadcrumb>
      </CHeader>
      <div className="main">{children}</div>
    </div>
  );
}
