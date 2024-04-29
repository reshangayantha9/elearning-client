import { useGetHeroDataQuery } from "../../redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { styles } from "../styles/style";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ");
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);
  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };
  return (
    <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px] mb-7">
        <h1 className="text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2 800px:text-[40px]">
  Frequently Asked Questions
</h1>
      <div className="mt-12">
        <dl className="space-y-8">
          {questions.map((q: any, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <div
              className={`${
                q._id !== questions[0]?._id && "border-t"
              } border-gray-200 pt-6`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                  onClick={() => toggleQuestion(q._id)}
                >
                  <span className="font-medium text-black dark:text-white">
                    {q.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    {q.active ? (
                      <HiMinus className="h-6 w-6" />
                    ) : (
                      <HiPlus className="h-6 w-6" />
                    )}
                  </span>
                </button>
              </dt>
              {q.active && (
                <dd className="mt-2 pr-12">
                  <span className="text-base font-Poppins text-black dark:text-white">
                    {q.answer}
                  </span>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FAQ;
