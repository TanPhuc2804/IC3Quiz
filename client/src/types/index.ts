import type { QuestionType } from "./enums";

export interface User {
    _id?: string,
    id: number,
    username: string,
    fullname: string,
    role: string,
    status: string,
    package?: any,
    email?: string,
    password?: string,
    birthday?: string,
    created_at?: Date,
    updated_at?: Date,
}

export interface Exam {
    _id?: string,
    id: number,
    content: string,
    description: string,
    image_url: string,
    total_user: number,
    total_question: number,
    duration: number,
    category_id: number,
    created_at?: Date,
    updated_at?: Date,
}

export interface Question {
    _id?:string,
    id?: number,
    content: string,
    question?: number,
    question_type: QuestionType
    limit_choice?: number
    correct_answer?: string,
    exam_id?: any[],
    option?: string[],
    classify_question?: ClassificationQuestion[],
    multiple_question?: Mutiple_Question[],
    match_question?: MatchQuestion[]
}

export interface MatchQuestion {
    id: number,
    term: string,
    definition: string,
}

export interface ClassificationQuestion {
    id: number,
    content: string,
    classify: string,
}

export interface Mutiple_Question {
    id?: number,
    option_text: string,
    is_correct: boolean,
}

export interface Exam_Result {
    _id?: string,
    user_id: number,
    exam: Exam,
    submit_time: number,
    score: number,
    accurary_percentage: number, // phan tram dung
    error_percentage: number,// phan tram sai
    total_content: number,
    result_detail: ResultsType[],
    createdAt?: string,
    updatedAt?: string,
}

export interface Category {
    id: number,
    content: string,
    image_url: string
}

export type ResultsType = {
    question_id: number,
    question_type: string,
    question: number,
    user_answer?: ResultQuestionType | ResultQuestionType[]
}

export type ResultQuestionType = {
    id_classify?: number
    isCorrect: boolean,
    choice: any,
    anwser_correct?: any
}

export type QuestionTableType = {
    id: number,
    question: number,
    is_correct: boolean
}

export type TableResult = {
    question_type: Question["question_type"],
    correct_total: number,
    incorrect_total: number,
    overlook_total: number,
    accurary_percentage: number,
    questions: QuestionTableType[]
}


export interface Package {
    _id: string,
    name: string,
    description: string,
    price: number,
    duration: number, // in days
    benefits: string[],
}
// error response from backend
export interface ErrorResponse {
    success: boolean,
    error: string,
    statusCode?: number
}
