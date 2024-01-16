'use client'
import AllUsers from '../../../app/components/Admin/Users/AllUsers';
import DashboardHeader from '../../../app/components/Admin/DashboardHeader';
import AdminProtected from '../../../app/hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import AdminSidebar from "../../components/Admin/AdminSidebar";
import React, { FC } from 'react'

type Props = {}

const page:FC<Props> = ({}) => {
    return (
      <div>
        <AdminProtected>
          <Heading
            title={`ELearning - Admin`}
            description="ELearning is a platform for students to learn and get help from teachers"
            keywords="Programming, MERN, Redux"
          />
          <div className="flex h-screen">
            <div className="1500px:w-[16%] w-1/5">
              <AdminSidebar />
            </div>
            <div className="w-[85%]">
              <DashboardHeader />
              <AllUsers isTeam={false}/>
            </div>
          </div>
        </AdminProtected>
      </div>
    )
  }
  
export default page