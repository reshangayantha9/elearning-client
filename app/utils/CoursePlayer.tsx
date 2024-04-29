import React, { FC } from "react";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  return (
    <div className="relative pt-[56.25%] overflow-hidden">
      <iframe
        width={560}
        height={315}
        src={videoUrl}
        title={title}
        frameBorder={0}
        style={
          {
            position:"absolute",
            top:0,
            left:0,
            width:"100%",
            height:"100%",
            border:0

          }
        }
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CoursePlayer;
