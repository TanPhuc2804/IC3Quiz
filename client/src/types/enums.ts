export const QuestionType ={
    NORMAL:"normal",
    MULTIPLE:"multiple",
    DROP_MATCH:"drop_match",
    CLASSIFY:"classify"
}

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]