"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OpenAI from "openai";
import axios from "axios";
import toast from "react-hot-toast";
interface Props {}

const openai = new OpenAI({
  apiKey: "sk-proj-Fvfzvggdj7uoALeWAil1T3BlbkFJFHNIoWTKYn5fM27Mx3TQ",
  dangerouslyAllowBrowser: true,
});

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");

  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<any>([
    { role: "", content: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = async () => {
    setIsLoading(true);

    setChatHistory((prev: any) => [
      ...prev,
      { role: "user", content: userInput },
    ]);
    console.log(chatHistory)
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [...chatHistory, { role: "assistant", content: userInput }],
        model: "gpt-3.5-turbo",
      });

      setChatHistory((prev: any) => [
        ...prev,
        {
          role: "assistant",
          content: chatCompletion.choices[0].message.content,
        },
      ]);
      setUserInput("");
      setIsLoading(false);
    } catch (err:any) {
        toast.error("oops something happen!!!")
        console.log(err.message)
    }
  };

  return (
    <div>
      <Heading
        title="ELearning GPT"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <div className="bg-white dark:bg-slate-900 min-h-screen flex flex-col justify-center items-center ">
        <div className="w-full max-w-screen-md p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <div className="text-4xl font-bold dark:text-white text-black">GPT Assistant </div>
            <p className="text-gray-600 text-lg dark:text-white text-black">
              Welcome to ELearnig AI powered assistant. Ask me anything!!!
            </p>
          </div>
          <div className="mb-4" style={{ height: "400px", overflow: "auto" }}>
            {chatHistory.map((message: any, index: number) => (
              <div
                key={index}
                className={`${
                  message.role === "user" ? "text-left" : "text-right"
                } mb-2 flex`}
              >
                <div
                  className={`rounded-full p-4 max-w-md mx-4 line block ${
                    message.role === "user"
                      ? "bg-blue-300 text-blue-800"
                      : "bg-green-300 text-green-800"
                  }`}
                >
                  {message.role === "user" ? "H" : "A"}
                </div>
                <div
                  className={`max-w-md mx-4 my-2 inline block ${
                    message.role === "user"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  } p-2`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder="Ask me something..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 p-2 rounded-1-lg"
            />
            {isLoading ? (
              <div className="bg-blue-500 text-white p-2 rounded-r-lg animate-pulse">
                Loading...
              </div>
            ) : (
              <button
                onClick={handleUserInput}
                className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
              >
                Ask
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
