import React, { useEffect, useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import { CBadge, CButton, CTooltip, CFormSwitch } from "@coreui/react";
import { useRouter } from "next/navigation";
import getAllExams, { Exam } from "@/app/api/getAllExams";
import EditExam from "./EditExam";
import putExam from "@/app/api/putExam";
import DeleteExam from "./DeleteExam";
import "./ExamTable.css";
import ActiveExamWarnig from "./ActiveExamWarnig";

const activeColumns = [
  {
    key: "id",
    label: "شناسه",
  },
  {
    key: "title",
    label: "عنوان",
  },
  {
    key: "description",
    label: "توضیحات",
  },
  {
    key: "examSurveys",
    label: "لیست پرسشنامه ها",
    filter: false,
    sorter: false,
  },
];

const notActiveColumns = [
  {
    key: "id",
    label: "شناسه",
  },
  {
    key: "title",
    label: "عنوان",
  },
  {
    key: "description",
    label: "توضیحات",
  },
  {
    key: "examSurveys",
    label: "لیست پرسشنامه ها",
    filter: false,
    sorter: false,
  },
  {
    key: "action",
    label: "عملیات",
    _style: {
      width: "10%",
      textAlign: "center",
    },
    filter: false,
    sorter: false,
  },
];

interface inputProps {
  newVisible: boolean;
  active: boolean;
}

export default function ExamTable({ newVisible, active }: inputProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [exams, setExams] = useState<Exam[]>([]);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [editVisible, seteditVisible] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);
  const [activeId, setActiveId] = useState(-1);
  const [activeVisible, setActiveVisible] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      setIsLoading(true);
      const response = await getAllExams();
      if (Array.isArray(response)) {
        setExams(response);
      } else {
        console.error(`Failed to fetch surveys: Status code ${response}`);
      }
    };
    fetchExam();
  }, [editVisible, deleteVisible, newVisible, activeVisible]);

  useEffect(() => {
    setIsLoading(true);
    const tmp = exams.filter((exam) => exam.isActive === active);
    console.log(tmp);
    setFilteredExams(tmp);
    setIsLoading(false);
  }, [exams, active]);

  const handleEdit = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditId(id);
    seteditVisible(true);
  };

  const handleRemove = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setDeleteId(id);
    setDeleteVisible(true);
  };

  const handleActiveToggle = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveId(id);
    setActiveVisible(true);
  };
  return (
    <div>
      <CSmartTable
        loading={isLoading}
        activePage={1}
        columns={active ? activeColumns : notActiveColumns}
        items={filteredExams}
        cleaner
        itemsPerPageSelect
        itemsPerPage={5}
        itemsPerPageLabel="تعداد آزمون در هر صفحه"
        noItemsLabel={isLoading ? "" : "هیچ آزمونی یافت نشد"}
        pagination
        tableFilter
        tableFilterLabel=""
        tableFilterPlaceholder="جست وجو"
        tableProps={{
          responsive: true,
        }}
        scopedColumns={{
          examSurveys: (item: Exam) => {
            return (
              <td>
                {item.examSurveys?.map((survey) => (
                  <div key={survey.surveyId}>{survey.survey?.title}</div>
                ))}
              </td>
            );
          },

          action: (item: Exam) => {
            return (
              <td className="action">
                <div className="action-container">
                  {!active && (
                    <button
                      disabled={item.isActive}
                      onClick={(event) => handleActiveToggle(item.id, event)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 256 256"
                        color={item.isActive ? "black" : "gray"}
                      >
                        <path
                          fill="currentColor"
                          d="M116 128V48a12 12 0 0 1 24 0v80a12 12 0 0 1-24 0m66.55-82a12 12 0 0 0-13.1 20.1C191.41 80.37 204 103 204 128a76 76 0 0 1-152 0c0-25 12.59-47.63 34.55-61.95A12 12 0 0 0 73.45 46C44.56 64.78 28 94.69 28 128a100 100 0 0 0 200 0c0-33.31-16.56-63.22-45.45-82"
                        ></path>
                      </svg>
                    </button>
                  )}
                  <CButton onClick={(event) => handleRemove(item.id, event)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#D92641"
                        d="M12 2.75a2.25 2.25 0 0 0-2.122 1.5a.75.75 0 0 1-1.414-.5a3.751 3.751 0 0 1 7.073 0a.75.75 0 0 1-1.415.5A2.251 2.251 0 0 0 12 2.75M2.75 6a.75.75 0 0 1 .75-.75h17a.75.75 0 0 1 0 1.5h-17A.75.75 0 0 1 2.75 6m3.165 2.45a.75.75 0 1 0-1.497.1l.464 6.952c.085 1.282.154 2.318.316 3.132c.169.845.455 1.551 1.047 2.104c.591.554 1.315.793 2.17.904c.822.108 1.86.108 3.146.108h.879c1.285 0 2.324 0 3.146-.108c.854-.111 1.578-.35 2.17-.904c.591-.553.877-1.26 1.046-2.104c.162-.814.23-1.85.316-3.132l.464-6.952a.75.75 0 0 0-1.497-.1l-.46 6.9c-.09 1.347-.154 2.285-.294 2.99c-.137.685-.327 1.047-.6 1.303c-.274.256-.648.422-1.34.512c-.713.093-1.653.095-3.004.095h-.774c-1.35 0-2.29-.002-3.004-.095c-.692-.09-1.066-.256-1.34-.512c-.273-.256-.463-.618-.6-1.303c-.14-.705-.204-1.643-.294-2.99z"
                      ></path>
                      <path
                        fill="#D92641"
                        d="M9.425 10.254a.75.75 0 0 1 .821.671l.5 5a.75.75 0 0 1-1.492.15l-.5-5a.75.75 0 0 1 .671-.821m5.821.821a.75.75 0 0 0-1.492-.15l-.5 5a.75.75 0 0 0 1.492.15z"
                      ></path>
                    </svg>
                  </CButton>
                  <CButton onClick={(event) => handleEdit(item.id, event)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="#2954E6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                      >
                        <path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56"></path>
                        <path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.362 1.362 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.361 1.361 0 0 1-.953.395H8.197a1.362 1.362 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086"></path>
                      </g>
                    </svg>
                  </CButton>
                </div>
              </td>
            );
          },
        }}
      />
      <EditExam
        visible={editVisible}
        id={editId}
        setVisible={seteditVisible}
      />
      <DeleteExam
        visible={deleteVisible}
        id={deleteId}
        setVisible={setDeleteVisible}
      />
      <ActiveExamWarnig
        visible={activeVisible}
        id={activeId}
        setVisible={setActiveVisible}
      />
    </div>
  );
}
