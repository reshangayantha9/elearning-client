"use client";
import React, { FC, useEffect, useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { useSearchParams } from "next/navigation";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import { styles } from "../styles/style";
import CourseCard from "../components/course/CourseCard";
import Footer from "../components/Footer";
type Props = {};
const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const { data: categories } = useGetHeroDataQuery("Categories");
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.course);
    }
    if (category !== "All") {
      setCourses(
        data?.course.filter((item: any) => item.categories === category)
      );
    }
    if (search) {
      setCourses(
        data?.course.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    }
  }, [data, category, search]);
  console.log(data)
  console.log(courses)
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setRoute={setRoute}
            route={route}
          />
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[100vh]">
            <Heading
              title={`ELearning -Course`}
              description="ELearning is a platform for students to learn and get help from teachers"
              keywords="Programming, MERN, Redux"
            />
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? " bg-[crimson]" : " bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.layout.categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item.title
                          ? " bg-[crimson]"
                          : " bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? "No courses found"
                  : "No courses found in this category. Please try another one"}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
