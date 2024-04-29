/* eslint-disable react/jsx-key */
import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import CourseContentList from "./CourseContentList";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import Image from "next/image";
import { VscVerifiedFilled } from "react-icons/vsc";
import socketIO from "socket.io-client";

const ENDPOINT =process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId=socketIO(ENDPOINT,{transports:["websocket"]})

type Props = {
  data: any;
  setRoute:any;
  setOpen:any
};

const CourseDetails: FC<Props> = ({ data,setRoute,setOpen:openAuthModel }) => {
  const { data: userData,refetch } = useLoadUserQuery(undefined, { refetchOnMountOrArgChange: true});
  const [user,setUser]=useState<any>();
  useEffect(()=>{
    setUser(userData?.user)
  },[userData])
  const [createOrder, { data: orderData, error,isSuccess }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  
  
  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);
  const handleOrder = (e: any) => {
    if(user){
       e.preventDefault();
    createOrder({
      courseId: data._id,

      payment_info: {
        success: true,
      },
    });
    }else{
      setRoute("Login")
      openAuthModel(true)
    }
   
  };
  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
      refetch();
      socketId.emit("notification",{
        title:"New Order",
        message:`You have a new order from ${data.name}`,
        userId:user._id
      })
      toast.success("Order conform");
      redirect(`/course-access/${data._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600]  text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className=" text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className=" text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600]  text-black dark:text-white">
              What you will learn from this course?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className=" text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2  text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-[25px] font-Poppins font-[600]  text-black dark:text-white">
              What are the prerequisites for starting this course?
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={20}
                    className=" text-black dark:text-white"
                  />
                </div>
                <p className="pl-2  text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <div className="">
              <h1 className="text-[25px] font-Poppins font-[600]  text-black dark:text-white">
                Course Overview
              </h1>
              {/* course content list */}
              <CourseContentList data={data?.courseData} />
            </div>
            <br />
            <br />
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600]  text-black dark:text-white">
                Course Details
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden  text-black dark:text-white">
                {data.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  Course Ratings * {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-[50px] h-50px">
                        <Image
                          src={
                            item?.user.avatar
                              ? item?.user.avatar.url
                              : "../../../public/assets/avatar.jpg"
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>

                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-black dark:text-white">
                          {item.comment}
                        </p>
                        <small className="text-[#000000d1] dark:[#ffffff83]">
                          {format(item.createdAt)}
                        </small>
                      </div>
                      <div className="pl-2 flex 800px:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                    </div>
                    {
                      
                        item.commentReplies.map((i: any) => (
                          <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                            <div>
                              <Image
                                src={
                                  i.user.avatar
                                    ? item.user.avatar.url
                                    : "../../../public/assets/avatar.jpg"
                                }
                                width={50}
                                height={50}
                                alt=""
                                className="w-[50px] h-[50px] rounded-full object-cover"
                              />
                            </div>
                            <div className="pl-3">
                              <div className="flex items-center">
                                <h5 className="text-[20px]">{i?.user.name}</h5>
                                {i.user.role === "admin" && (
                                  <VscVerifiedFilled className="text-[#50c750] ml-2 text-[20px]" />
                                )}
                              </div>
                              <p>{i?.comment}</p>
                              <small className=" text-black dark:text-[#ffffff83]">
                                {!i.createdAt ? "" : format(i?.createdAt)} .
                              </small>
                            </div>
                          </div>
                        ))
                      
                    }
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px]  text-black dark:text-white">
                  {data.price === 0 ? "Free" : data.price + "LKR"}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80  text-black dark:text-white">
                  {data.estimatedPrice}
                </h5>
                <h4 className="pl-5 pt-4 text-[22px]  text-black dark:text-white">
                  {discountPercentagePrice}% Off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    href={`/course-access/${data._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[250px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    onClick={handleOrder}
                  >
                    Buy Now {data.price}{" "}LKR
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1  text-black dark:text-white">
                • Source code included
              </p>
              <p className="pb-1  text-black dark:text-white">
                • Full Lifetime access
              </p>
              <p className="pb-1  text-black dark:text-white">
                • Certificate of completion
              </p>
              <p className="pb-1  text-black dark:text-white">
                • Premium Support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
