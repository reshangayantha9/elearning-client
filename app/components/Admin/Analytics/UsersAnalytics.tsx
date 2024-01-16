import React, { FC } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
  Tooltip,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetUsesAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import { styles } from "../../../../app/styles/style";
import { isDataView } from "util/types";
type Props = {
  isDashboard: boolean;
};

const UsersAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsesAnalyticsQuery({});
  const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div >
          <div
            className={`${
              !isDashboard
                ? "mt-[50px] pl-[30px]"
                : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
            }`}
          >
            <h1 className={`${styles.title} px-5 !text-start`}>
              Users Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data{" "}
            </p>
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            }  flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                data={analyticsData}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersAnalytics;
