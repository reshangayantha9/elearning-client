import { styles } from "../../../../app/styles/style";
import {
  useGetHeroDataQuery,
  useEditLayoutMutation,
} from "../../../../redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [questions, setQuestions] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (isSuccess) {
      refetch();
      toast.success("FAQ updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);
  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };
  const handleQuestionChange = (index:number, value: string) => {
    // setQuestions((prevQuestion) =>
    //   prevQuestion.map((q) => (q._id === id ? { ...q, question: value } : q))
    // );
    const updatedQuestions=[...questions];
    updatedQuestions[index].question=value;
    setQuestions(updatedQuestions);

  };
  const handleAnswerChange = (index:number, value: string) => {
    // setQuestions((prevQuestion) =>
    //   prevQuestion.map((q) => (q._id === id ? { ...q, answer: value } : q))
    // );
    const updatedAnswer=[...questions];
    updatedAnswer[index].answer=value;
    setQuestions(updatedAnswer)

  };
  const handleDelete=(index:number)=>{
    const updatedQuestions=[...questions];
    updatedQuestions.splice(index,1);
    setQuestions(updatedQuestions);
  }
  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
      },
    ]);
  };
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };
  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };
  const handleEit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions.map((q: any,index:number) => (
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
                      <input
                        className={`${styles.input} border-none`}
                        value={q.question}
                        onChange={(e: any) =>
                          handleQuestionChange(index, e.target.value)
                        }
                        placeholder={"Add your question..."}
                      />
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
                      <input
                        className={`${styles.input} border-none`}
                        value={q.answer}
                        onChange={(e: any) =>
                          handleAnswerChange(index, e.target.value)
                        }
                        placeholder="Add your answer"
                      />
                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="dark:text-white text-black text-[18px] cursor-pointer"
                          onClick={() => {
                            // setQuestions((prevQuestions) =>
                            //   prevQuestions.filter((item) => item._id !== q._id)
                            // );
                            handleDelete(index);
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />
            <br />
            <br />
            <br />
          </div>
          <div
            className={`${
              styles.button
            } !w-[180px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#ccccc34]
          
           ${
             areQuestionsUnchanged(data?.layout?.faq, questions) ||
             isAnyQuestionEmpty(questions)
               ? "!cursor-not-allowed"
               : "cursor-pointer !bg-[#42d383]"
           } !rounded absolute bottom-12 right-12`}
            onClick={
              areQuestionsUnchanged(data?.layout?.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEit
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
