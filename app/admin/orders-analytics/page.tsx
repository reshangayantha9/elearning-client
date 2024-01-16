"use client";
import React, { FC } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import Heading from "../../utils/Heading";
import OrdersAnalytics from '../../components/Admin/Analytics/OrdersAnalytics'
import DashboardHeader from "../../../app/components/Admin/DashboardHeader";
import AdminProtected from "../../../app/hooks/adminProtected";

type Props = {};

const page = ({params}:any) => {
  const id=params?.id;
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`ELearning - Admin`}
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux"
        />
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5 ">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader />
            <OrdersAnalytics isDashboard={false}/>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;