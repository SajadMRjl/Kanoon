import React, { useEffect, useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import "./AdminTable.css";
import { CButton } from "@coreui/react";
import getAllAdmins from "@/app/api/getAllAdmins";
import { User } from "@/app/api/getMe";

const columns = [
  {
    key: "id",
    filter: false,
    label: "شناسه",
  },
  {
    key: "username",
    filter: false,
    label: "نام کاربری",
  },
  {
    key: "email",
    label: "ایمیل",
    filter: false,
  },
  {
    key: "first_name",
    filter: false,
    label: "نام",
  },
  {
    key: "last_name",
    filter: false,
    label: "نام خانوادگی",
  },
  {
    key: "phone_number",
    filter: false,
    label: "شماره موبایل",
  },
  {
    key: "identity_code",
    filter: false,
    label: "کد ملی",
  },
  {
    key: "action",
    label: "",
    filter: false,
    sorter: false,
  },
];

interface inputProps {
  newVisible: boolean;
}

export default function AdminTable({ newVisible }: inputProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [admins, setAdmins] = useState<User[]>([]);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);

  useEffect(() => {
    const fetchAdmins = async () => {
      setIsLoading(true);
      const response = await getAllAdmins();
      if (Array.isArray(response)) {
        setAdmins(response);
      } else {
        console.error(`Failed to fetch surveys: Status code ${response}`);
      }
      setIsLoading(false);
    };
    fetchAdmins();
  }, [deleteVisible, newVisible]);

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
        items={admins}
        cleaner
        itemsPerPageSelect
        itemsPerPage={5}
        itemsPerPageLabel="تعداد ادمین در هر صفحه"
        noItemsLabel={isLoading ? "" : "هیچ ادمینی یافت نشد"}
        pagination
        tableFilter
        tableFilterLabel=""
        tableFilterPlaceholder="جست وجو"
        tableProps={{
          responsive: true,
        }}
        scopedColumns={{
          action: (item: User) => {
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
                </div>
              </td>
            );
          },
        }}
      />
    </div>
  );
}
