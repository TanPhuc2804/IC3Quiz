export const QuestionType ={
    NORMAL:"normal",
    MULTIPLE:"multiple",
    DROP_MATCH:"drop_match",
    CLASSIFY:"classify"
}

export const ModeEnum ={
    TRAINING:"training",
    TEST:"test",
   
}


export type ModeEnum = (typeof ModeEnum)[keyof typeof ModeEnum]

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]