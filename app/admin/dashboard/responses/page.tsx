"use client";

import { CButton, CFormSelect } from "@coreui/react";
import { CSmartTable } from "@coreui/react-pro";
import "./page.css";
import { useState, useEffect, Suspense } from "react";
import jalaali from "jalaali-js";
import getAllExamSession, { ExamSession } from "@/app/api/getAllExamSessions";
import getAllResponses, { Response } from "@/app/api/getAllResponses";
import getAllUser, { User } from "@/app/api/getAllUser";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import UserScoreModal from "@/app/components/admin/responses/UserScoreModal";

function PageContent() {
  const [examSessions, setExamSessions] = useState<ExamSession[]>([]);
  const [responses, setResponses] = useState<Response[] | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedExamSessionId, setSelectedExamSessionId] = useState<
    number | null
  >(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const examSessionIdFromUrl = searchParams.get("examSessionId");

  useEffect(() => {
    const fetchExamSessions = async () => {
      const response = await getAllExamSession();
      if (Array.isArray(response)) {
        setExamSessions(response);
      }
      const response2 = await getAllUser();
      if (Array.isArray(response2)) {
        setUsers(response2);
      }
    };
    fetchExamSessions();
  }, []);

  useEffect(() => {
    if (examSessionIdFromUrl) {
      setLoading(true);
      const fetchResponses = async () => {
        const response = await getAllResponses({
          exam_session_id: examSessionIdFromUrl,
        });

        const enrichedResponses = Array.isArray(response)
          ? response.map((resp) => {
              const user = users.find((user) => user.id === resp.userId);
              return {
                ...resp,
                fullName: user
                  ? `${user.first_name} ${user.last_name}`
                  : "User not found",
              };
            })
          : [];

        setResponses(enrichedResponses);
        setLoading(false);
      };
      fetchResponses();
    }
  }, [examSessionIdFromUrl, users]);

  const handleDetailButtonClick = (examSessionId: number, userId: number) => {
    setSelectedExamSessionId(examSessionId);
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  const toShamsiWithTime = (dateString: string) => {
    const date = new Date(dateString);
    const shamsiDate = jalaali.toJalaali(date);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${shamsiDate.jy}/${shamsiDate.jm}/${shamsiDate.jd}, ${hours}:${minutes}`;
  };

  const handleExamSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId) {
      const params = new URLSearchParams(window.location.search);
      params.set("examSessionId", selectedId);
      window.history.replaceState({}, "", `${pathname}?${params.toString()}`);
    }
  };

  const columns = [
    { key: "id", label: "شناسه", _style: { width: "5%" } },
    { key: "fullName", label: "نام و نام خانوادگی", _style: { width: "10%" } },
    { key: "startTime", label: "زمان شروع آزمون", _style: { width: "15%" } },
    {
      key: "action",
      label: "جزئیات",
      _style: { width: "4%", textAlign: "center" },
    },
  ];

  return (
    <div className="page">
      <div className="w-full">
        <h2 className="page-header">نتایج آزمون ها</h2>
        <div className="flex flex-row mx-4 w-1/2 gap-4 items-center">
          <div className="text-xl">آزمون</div>
          <CFormSelect
            value={examSessionIdFromUrl || ""}
            onChange={handleExamSelection}
          >
            <option
              value=""
              disabled
            >
              انتخاب کنید
            </option>
            {examSessions.map((session) => (
              <option
                key={session.id}
                value={session.id}
              >
                {session.exam.title} - {toShamsiWithTime(session.startTime)}
              </option>
            ))}
          </CFormSelect>
        </div>

        {!examSessionIdFromUrl && (
          <div className="alert alert-warning mt-4">
            لطفاً یک آزمون را انتخاب کنید
          </div>
        )}

        {examSessionIdFromUrl && responses && (
          <div className="mt-4">
            <CSmartTable
              activePage={1}
              items={responses}
              columns={columns}
              tableFilter
              tableFilterPlaceholder="جست و جو"
              tableFilterLabel=""
              itemsPerPage={5}
              itemsPerPageSelect
              itemsPerPageLabel="تعداد پاسخ در هر صفحه"
              noItemsLabel={
                loading ? "" : "هیچ پاسخی برای این آزمون وجود ندارد."
              }
              pagination
              loading={loading}
              scopedColumns={{
                startTime: (item: Response) => {
                  return (
                    <td>
                      <div>{toShamsiWithTime(item.startTime)}</div>
                    </td>
                  );
                },
                action: (item: Response) => {
                  return (
                    <td>
                      <span className="flex justify-center items-center cursor-pointer">
                        <CButton
                          className="detail-btn"
                          onClick={() =>
                            handleDetailButtonClick(
                              item.examSessionId,
                              item.userId
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.2em"
                            height="1.2em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.97.89 1.66.89H22c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H7.07L2.4 12l4.66-7H22z"
                            ></path>
                            <circle
                              cx={9}
                              cy={12}
                              r={1.5}
                              fill="currentColor"
                            ></circle>
                            <circle
                              cx={14}
                              cy={12}
                              r={1.5}
                              fill="currentColor"
                            ></circle>
                            <circle
                              cx={19}
                              cy={12}
                              r={1.5}
                              fill="currentColor"
                            ></circle>
                          </svg>
                        </CButton>
                      </span>
                    </td>
                  );
                },
              }}
            />
          </div>
        )}
      </div>
      {selectedExamSessionId && selectedUserId && (
        <UserScoreModal
          examSessionId={selectedExamSessionId}
          userId={selectedUserId}
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
