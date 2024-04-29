"use client";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { useGetHeroDataQuery } from "../../../redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

interface Props {}

const Hero: FC<Props> = (props) => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search,setSearch]=useState("");
  const router=useRouter();
  const handleSearch=()=>{
    if(search===""){
      return
    }else{
      router.push(`/courses?title=${search}`)
    }
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full 1000px:flex items-center">
          <div className="absolute top-[100px] 1000px:top-[200px] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-1"></div>
          <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
            <Image
              // src={require("../../../public/assets/girl.png")}
              src={data?.layout?.banner?.image?.url}
              width={400}
              height={400}
              alt="Hero Image"
              className="object-contain 1000px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
            />
          </div>
          <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
            <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%]">
              {data?.layout?.banner?.title}
            </h2>
            <br />
            <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
              {data?.layout?.banner?.subTitle}
            </p>
            <br />
            <br />
            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
              <input
                placeholder="Search Courses..."
                className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
                type="search"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
              <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
               onClick={handleSearch}
              >
                <BiSearch className="text-center" size={30} />
              </div>
            </div>
            <br />
            <br />
            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
              <Image
                src={require("../../../public/assets/Hero-1.png")}
                alt="Hero Image"
                className="rounded-full ml-[-20px]"
              />
              <Image
                src={require("../../../public/assets/Hero-2.png")}
                alt="Hero Image"
                className="rounded-full ml-[-20px]"
              />
              <Image
                src={require("../../../public/assets/Hero-3.png")}
                alt="Hero Image"
                className="rounded-full ml-[-20px]"
              />
              <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
                500K+ People already trusted us.{" "}
                <Link
                  href="/courses"
                  className="dark:text-[#46e256] text-[crimson]"
                >
                  View Courses
                </Link>{" "}
              </p>
            </div>
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
