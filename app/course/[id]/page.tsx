"use client";

import CourseDetails from "../../components/course/CourseDetailsPage";

const Page =({params}:any)=>{
    return(
        <div>
            <CourseDetails id={params.id}/>
        </div>
    )
}
export default Page;