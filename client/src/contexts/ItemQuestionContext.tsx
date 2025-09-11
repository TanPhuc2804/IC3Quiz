import { createContext, useContext } from "react";

type ItemQuestionType= {
    itemRef:React.RefObject<(HTMLDivElement | null)[]>;
    changBgItemQuestion: (question_id:number,idChange:boolean) =>void
}

const ItemQuestionContext = createContext<ItemQuestionType|null>(null)

export const useItemQuestionContext = ()=>{
    const itemQuestionContext = useContext(ItemQuestionContext)
    if(!itemQuestionContext) throw new  Error("useItemQuestionContext must be used within QuestionContext.Provider")
    return itemQuestionContext
}

export default ItemQuestionContext