import React from "react";
import ReviewCard from "../Review/ReviewCard";
import Image from "next/image";

type Props = {};
export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    profession: "Student | USJ",
    comment:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur voluptatum blanditiis aspernatur commodi maxime non nesciunt tenetur consequuntur atque veniam. In dolorem eos fugiat molestiae ut earum asperiores non at.",
  },
];
const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center justify-between">
        <div className="800px:w-[50%] w-full">
          <Image
            alt="business"
            loading="lazy"
            width={400}
            height={400}
            className="w-[400px] h-[400] object-cover rounded-[10px]"
            src={require("../../../public/assets/student-man-with-thumb-up.jpg")}
          />
        </div>
        <div className="800px:w-[45%] w-full">
          <h3 className="text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2 800px:!text-[40px]">
            Our Students Are <span className="text-gradient">Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <p className="text-[16px] font-Poppins text-black dark:text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde
            voluptatum dignissimos, nulla perferendis dolorem voluptate nemo
            possimus magni deleniti natus accusamus officiis quasi nihil
            commodi, praesentium quidem, quis doloribus?
          </p>
          <br />
        </div>
        <br />
        <br />
      </div>
      <br />
      <br />
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
