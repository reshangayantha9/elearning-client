"use client";
import { FC, useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import WebIcon from "@mui/icons-material/Web";
import QuizIcon from "@mui/icons-material/Quiz";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import avatarDefault from "../../../public/assets/avatar.jpg";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};
const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogOut] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  const logoutHandler = () => {
    setLogOut(true);
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111c43 !important" : "#fff !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#111c43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{ margin: "10px 0 20px 0" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/">
                  <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                    ELearning
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Image
                  alt="profile-user"
                  width={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                  className="w-[100px] h-[100px]"
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-dark dark:text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0 " }}
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}
          <MenuItem icon={<HomeOutlined />}>
            <Link href="/admin">
              <h4 className="text-[15px] font-Poppins uppercase dark:text-white text-black">
                Dashboard
              </h4>
            </Link>
          </MenuItem>
          <MenuItem icon={<GroupIcon />}>
            <Link href="/admin/users">
              <h4 className="text-[15px] font-Poppins uppercase dark:text-white text-black">
                Users
              </h4>
            </Link>
          </MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>
            <Link href="/admin/invoices">
              <h4 className="text-[15px] font-Poppins uppercase dark:text-white text-black">
                Invoices
              </h4>
            </Link>
          </MenuItem>
          <MenuItem icon={<VideoCallIcon />}>
            <Link href="/admin/create-course">
              <h4 className="text-[15px] font-Poppins uppercase dark:text-white text-black">
                Create course
              </h4>
            </Link>
          </MenuItem>
          <MenuItem icon={<OndemandVideoIcon />}>
            <Link href="/admin/all-courses">
              <h4 className="text-[15px] font-Poppins uppercase dark:text-white text-black">
                Live courses
              </h4>
            </Link>
          </MenuItem>
          <MenuItem icon={<WebIcon/>}>
            <Link href="/admin/hero">
              <h4 className="text-[15px] font-Poppins uppercase dark:text-white text-black">
                Hero
              </h4>
            </Link>
          </MenuItem>
          <MenuItem icon={<QuizIcon />}>
            <Link href="/admin/faq">
              <h4 className="text-[15px] font-Poppins uppercase dark:text-white text-black">
                FAQ
              </h4>
            </Link>
          </MenuItem>
          <MenuItem icon={<WysiwygIcon />}>
            <Link href="/admin/categories">
              <h4 className="text-[15px] font-Poppins uppercase dark:text-white text-black">
                Categories
              </h4>
            </Link>
          </MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon/>}>
            <Link href="/admin/team">
              <h4 className="text-[15px] font-Poppins uppercase dark:text-white text-black">
                Manage Team
              </h4>
            </Link>
          </MenuItem>
          <MenuItem icon={<BarChartOutlinedIcon/>}>
            <Link href="/admin/courses-analytics">
              <h4 className="text-[15px] font-Poppins uppercase dark:text-white text-black">
                Courses Analytics
              </h4>
            </Link>
          </MenuItem>
          <MenuItem icon={<MapOutlinedIcon  />}>
            <Link href="/admin/orders-analytics">
              <h4 className="text-[15px] font-Poppins uppercase dark:text-white text-black">
                Orders Analytics
              </h4>
            </Link>
          </MenuItem>
          <MenuItem icon={<ManageHistoryIcon/>}>
            <Link href="/admin/users-analytics">
              <h4 className="text-[15px] font-Poppins uppercase dark:text-white text-black">
                Users Analytics
              </h4>
            </Link>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
