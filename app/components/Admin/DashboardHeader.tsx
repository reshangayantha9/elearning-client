"use client";
import React, { FC, useEffect, useState } from "react";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import {
  useGetAllNotificationQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notification/notificationApi";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notification, setNotification] = useState<any>([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3"
    )
  );
  const playerNotificationSound = () => {
    audio.play();
  };
  useEffect(() => {
    if (data) {
      setNotification(
        data.notification.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playerNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };
  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notification && notification.length}
        </span>
      </div>
      {open && (
        <div className="w-[400px] h-[50vh] overflow-y-scroll py-3 px-2 border border-[#ffffff0c] dark:bg-[#111c43] bg-white shadow-xl absolute top-16 z-[9999] rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white">
            Notification
          </h5>
          {notification &&
            notification.map((item: any, index: number) => (
              // eslint-disable-next-line react/jsx-key
              <div className="dark:bg-[#2d3a4e] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff0c] border-b-[#0000000f]">
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white text-[12px]">
                    {item.title}
                  </p>
                  <p className="text-black dark:text-white cursor-pointer text-[11px]"
                   onClick={()=>handleNotificationStatusChange(item._id)}
                  >
                    Mark as read
                  </p>
                </div>
                <p className="text-black dark:text-white mt-1">
                  {item.message}
                </p>
                <p className="px-2 text-black dark:text-white text-[14px]">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
