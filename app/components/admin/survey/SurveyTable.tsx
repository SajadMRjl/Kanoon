import React, { useEffect, useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import "./SurveyTable.css";
import { CButton } from "@coreui/react";
import getSurveyList from "@/app/api/getSurveyList";
import EditSurvey from "./EditSurvey";
import DeleteSurvey from "./DeleteSurvey";
import { useRouter } from "next/navigation";
import { Survey } from "@/app/api/getSurveyList";

const columns = [
  {
    key: "title",
    label: "عنوان",
    filter: false,
    sorter: true,
  },
  {
    key: "description",
    label: "توضیحات",
    filter: false,
    sorter: true,
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
}

export default function SurveyTable({ newVisible }: inputProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [editVisible, seteditVisible] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);

  const router = useRouter();

  useEffect(() => {
    const fetchSurveys = async () => {
      const response = await getSurveyList();
      if (Array.isArray(response)) {
        const sortedSurvey = response.sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        );
        setSurveys(sortedSurvey);
      } else {
        console.error(`Failed to fetch surveys: Status code ${response}`);
      }
      setIsLoading(false);
    };

    fetchSurveys();
  }, [editVisible, deleteVisible, newVisible]);

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
  return (
    <div>
      <CSmartTable
        loading={isLoading}
        activePage={1}
        columns={columns}
        items={surveys}
        cleaner
        itemsPerPageSelect
        itemsPerPage={5}
        itemsPerPageLabel="تعداد پرسشنامه در هر صفحه"
        noItemsLabel={isLoading ? "" : "هیچ پرسشنامه ای یافت نشد"}
        pagination
        tableFilter
        tableFilterLabel=""
        tableFilterPlaceholder="جست وجو"
        clickableRows
        onRowClick={(item) => router.push(`/admin/survey/${item.id}/questions`)}
        tableProps={{
          responsive: true,
          hover: true,
        }}
        scopedColumns={{
          action: (item: Survey) => {
            return (
              <td className="action">
                <div className="action-container">
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
      <EditSurvey
        setVisible={seteditVisible}
        visible={editVisible}
        id={editId}
      />
      <DeleteSurvey
        setVisible={setDeleteVisible}
        visible={deleteVisible}
        id={deleteId}
      />
    </div>
  );
}
