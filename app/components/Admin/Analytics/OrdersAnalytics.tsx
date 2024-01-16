import React, { FC } from 'react'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    LineChart,
    CartesianGrid,
    Tooltip,
    Legend,
    Line
}from "recharts"
import Loader from "../../Loader/Loader"
import { useGetOrdersAnalyticsQuery} from '../../../../redux/features/analytics/analyticsApi'
import { styles } from '../../../../app/styles/style'
type Props = {
    isDashboard:boolean;
}

const OrdersAnalytics:FC<Props> = ({isDashboard}) => {
    const {data,isLoading}=useGetOrdersAnalyticsQuery({});
    const analyticsData:any =[];

    data && data.orders.last12Months.forEach((item:any)=>{
        analyticsData.push({name:item.name,Count:item.count})
    })
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div
            className={`${
              !isDashboard
                ? "mt-[50px] pl-[30px]"
                : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
            }`}
          >
            <h1 className={`${styles.title} px-5 !text-start`}>
              Orders Analytics
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
              <LineChart
               width={500}
               height={300}
               data={analyticsData}
               margin={{
                top:5,
                right:30,
                left:20,
                bottom:5
               }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend/>}
                <Line type="monotone" dataKey="Count" stroke='#82ca9d'/>

              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  )
}

export default OrdersAnalytics