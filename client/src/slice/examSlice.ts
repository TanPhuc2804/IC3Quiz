import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Exam } from '../types';

export interface ExamState {
    exams: Exam[];
}
const initialState: ExamState = {
    exams: [],
};

export const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        getAllExams: (state, action: PayloadAction<Exam[]>) => {
            state.exams = action.payload;
        },
        allExams: (state, action: PayloadAction<Exam[]>) => {
            state.exams = action.payload;
        },
        insertExam: (state, action: PayloadAction<Exam>) => {
            state.exams.push(action.payload);
        }
    },
});

export const { getAllExams, allExams, insertExam } = examSlice.actions;

export default examSlice.reducer;
