import type { QuestionType } from "./enums";

export interface User {
    id: number,
    username: string,
    fullname: string,
    role: string,
    email?: string,
    password?: string,
    birthday?: string,
    created_at?: Date,
    updated_at?: Date,
}

export interface Exam {
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
    id: number,
    content: string,
    question: number,
    question_type: QuestionType
    limit_choice?: number
    correct_answer?: string,
    option?: string[],
    classify_question?: ClassificationQuestion[],
    multiple_question?: Mutiple_Question[],
    match_question?: MatchQuestion[]
}

export interface MatchQuestion {
    term: string,
    definition: string,
}

export interface ClassificationQuestion {
    content: string,
    classify: string,
}

export interface Mutiple_Question {
    option_text: string,
    is_correct: boolean,
}

export interface Exam_Result {
    user_id: number,
    exam_id: number,
    submit_time: number,
    score: number,
    accurary_percentage: number // phan tram dung
    error_percentage: number // phan tram sai
    total_content: number
}

export interface Result_Detail {
    result_id: number,
    question_id: number,
    is_correct: number,
    user_answer: string,
}

export interface Category {
    id: number,
    content: string,
    image_url: string
}