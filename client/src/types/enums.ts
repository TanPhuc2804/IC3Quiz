export const QuestionType ={
    NORMAL:"normal",
    MULTIPLE:"multiple",
    DROP_MATCH:"drop_match",
    CLASSIFY:"classify",
    FILL_BLANK:"fill_blank",
}

export const ModeEnum ={
    TRAINING:"training",
    TESTING:"testing",
   
}


export type ModeEnum = (typeof ModeEnum)[keyof typeof ModeEnum]

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]