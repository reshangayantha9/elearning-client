"use client";
import React, { FC, useState } from "react";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {
  open?:boolean;
  setOpen?:any;
};

const DashboardHeader: FC<Props> = ({open,setOpen}) => {

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          3
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] dark:bg-[#111c43] bg-white shadow-xl absolute top-16 z-10 rounded">
          <div className="w-full flex items-center justify-between p-2">
            <p className="text-black dark:text-white">New Question Received</p>
            <p className="text-black dark:text-white cursor-pointer">
              Mark as read
            </p>
          </div>
          <p className="text-black dark:text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            amet quod alias facilis omnis tenetur molestias corporis distinctio
            nam, incidunt culpa eaque ratione libero sapiente eligendi
            voluptatem nobis reiciendis quas.
          </p>
          <p className="px-2 text-black dark:text-white text-14-[px]">5 days ago</p>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
