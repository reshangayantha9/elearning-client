"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword"
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import CourseCard from "../course/CourseCard";
type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [courses,setCourses]=useState([])
  const {} = useLogOutQuery(undefined, {
    skip: logout ? true : false,
  });
  
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  useEffect(() => {
    if(data){
      const filteredCourses=user.courses.map((userCourses:any)=>data.course.find((course:any)=>course._id ===userCourses._id === userCourses._id)).filter((course:any)=>course !==undefined);
      setCourses(filteredCourses);
      console.log(filteredCourses)
    }
  }, [data])
  
  return (
    <div className="w-[85%] flex mx-auto mb-5">
      <div
        className={`w-[60px] 800px:w-[310px] w-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] dark:shadow-sm shadow-sm mt-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user}/>
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword/>
        </div>
      )}
       {active === 3 && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap[35px]">
            {
              courses && courses.map((item:any,index:number)=>(
                <CourseCard item={item} key={index} user={user} isProfile={true}/>

              ))
            }
          </div>
          {
            courses.length === 0&&(
              <h1 className="text-center text-[18px] font-Poppins">
                You dont have any purchased courses
              </h1>
            )
          }
        </div>
      )}
    </div>
  );
};

export default Profile;
