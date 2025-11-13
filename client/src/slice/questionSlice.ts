import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Exam, Question } from '../types';

export interface QuestionState {
    questions: Question[];
    selected?: Question;
}
const initialState: QuestionState = {
    questions: [],
};

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        getAllQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
        },
        insertQuestion: (state, action: PayloadAction<Question>) => {
            state.questions = state.questions.concat(action.payload);
        },
        insertExam: (state, action: PayloadAction<{ questionId: string; exams: Exam[] }>) => {
            const { questionId, exams } = action.payload;
            const questionIndex = state.questions.findIndex(q => q._id === questionId);
            if (questionIndex !== -1) {
                state.questions[questionIndex].exam_id = exams
                state.selected =  state.questions[questionIndex];
            }
        },
        selectedQuestion: (state, action: PayloadAction<Question | undefined>) => {
            state.selected = action.payload;
        }
    }
});

export const { getAllQuestions, insertQuestion, insertExam, selectedQuestion } = questionSlice.actions;

export default questionSlice.reducer;
