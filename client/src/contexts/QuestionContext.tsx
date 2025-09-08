import { createContext,useContext } from "react";

type QuestionContextType= {
    questionRefs:React.RefObject<(HTMLDivElement | null)[]>;
    scrollToQuestion:(index:number)=>void
}


const QuestionContext = createContext<QuestionContextType|null>(null)

export const useQuestionContext=()=>{
    const questionContext = useContext(QuestionContext)
    if(!questionContext) throw new Error("useQuestionContext must be used within QuestionContext.Provider");
    return questionContext
}

export default QuestionContext;