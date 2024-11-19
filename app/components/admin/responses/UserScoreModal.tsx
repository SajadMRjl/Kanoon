import {
  CModal,
  CModalBody,
  CModalHeader,
  CSmartTable,
} from "@coreui/react-pro";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import getUserScores, { UserScore } from "@/app/api/getUserScores";
import getAllUser, { User } from "@/app/api/getAllUser";
import jalaali from "jalaali-js";
import { estedad } from "@/app/components/font";
import { CSpinner } from "@coreui/react";
import "./UserScoreModal.css";

interface UserScoreModalProps {
  examSessionId: number;
  userId: number;
  isVisible: boolean;
  onClose: () => void;
}

export default function UserScoreModal({
  examSessionId,
  userId,
  isVisible,
  onClose,
}: UserScoreModalProps) {
  const [userScore, setUserScore] = useState<UserScore | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<(string | number)[][]>([]);

  useEffect(() => {
    if (isVisible) {
      setLoading(true);
      const fetchData = async () => {
        const scores = await getUserScores({
          exam_session_id: examSessionId,
          user_id: userId,
        });
        const userList = await getAllUser();
        let foundUser;
        if (Array.isArray(userList)) {
          foundUser = userList.find((user) => user.id === userId);
        }
        setUser(foundUser || null);
        setUserScore(scores as UserScore);

        setLoading(false);
      };
      fetchData();
    }
  }, [isVisible]);

  useEffect(() => {
    setChartData(prepareChartData());
  }, [userScore]);

  const prepareChartData = () => {
    if (!userScore) return [];
    if (!userScore.factorValues) return [];
    return [
      ["شاخص", "ارزش"],
      ...userScore?.factorValues.map((factor) => [factor.name, factor.value]),
    ];
  };

  const columns = [
    { key: "questionId", label: "شناسه سوال", _style: { width: "20%" } },
    { key: "optionId", label: "پاسخ", _style: { width: "60%" } },
    { key: "score", label: "نمره", _style: { width: "20%" } },
  ];

  return (
    <CModal
      visible={isVisible}
      alignment="center"
      onClose={onClose}
      size="lg"
      className="w-full"
      keyboard
    >
      <CModalHeader className="text-lg font-bold flex items-center justify-between">
        جزئیات نمرات کاربر
      </CModalHeader>
      <CModalBody className="max-h-[80vh] overflow-y-auto">
        {loading && (
          <div className="text-center h-full m-10">
            <CSpinner />
          </div>
        )}
        {!loading && userScore && user && (
          <>
            {/* User Information */}
            <div className="mb-4 border-b w-full px-4 py-2">
              <h4 className="text-xl font-semibold mt-2 mb-4">اطلاعات کاربر</h4>
              <div className="flex items-center justify-between mx-12 mt-2">
                <p>
                  <strong>نام و نام خانوادگی :</strong> {" " + user.first_name}
                  {user.last_name}
                </p>
                <p>
                  <strong>زمان شروع آزمون :</strong>
                  {" " + new Date(userScore.startTime).toLocaleString("fa-IR")}
                </p>
              </div>
              <p className="mx-12">
                <strong>نمره کل :</strong> {" " + userScore.totalScore}
              </p>
            </div>

            {/* Answer List */}
            <div
              className={`mb-4 ${
                chartData.length !== 1 && "border-b"
              } w-full px-4 py-2`}
            >
              <h4 className="text-xl font-semibold mb-4">پاسخ‌های کاربر</h4>
              <CSmartTable
                items={userScore.answers}
                columns={columns}
                itemsPerPage={5}
                tableFilterLabel=""
                tableFilterPlaceholder="جست و جو"
                pagination
                tableFilter
                className="mt-3"
                noItemsLabel={loading ? "" : "هیچ آزمونی یافت نشد"}
              />
            </div>

            {/* Factor Values Chart */}
            {chartData.length !== 1 && (
              <div className={`mx-12 mb-4 ${estedad.className}`}>
                <h4 className="text-xl font-semibold mb-2">نمودار عوامل</h4>
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="300px"
                  data={chartData}
                  options={{
                    hAxis: {
                      title: "عوامل",
                      textStyle: { fontName: estedad.className },
                    },
                    vAxis: {
                      title: "ارزش",
                      textStyle: { fontName: estedad.className },
                    },
                    titleTextStyle: { fontName: estedad.className },
                    colors: ["#34c38f", "#f46a6a"],
                    animation: {
                      startup: true,
                      easing: "linear",
                      duration: 1500,
                    },
                  }}
                />
              </div>
            )}
          </>
        )}
      </CModalBody>
    </CModal>
  );
}
