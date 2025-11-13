import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types';

export interface UserState {
    users: User[];
}
const initialState: UserState = {
    users: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        allUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        changeStatusRedux: (state, action: PayloadAction<{ userId: string; status: string }>) => {
            const { userId, status } = action.payload;
            const userIndex = state.users.findIndex(user => user._id === userId);
            if (userIndex !== -1) {
                state.users[userIndex].status = status;
            }
        },
    },
});

export const { addUser, allUsers, changeStatusRedux } = userSlice.actions;

export default userSlice.reducer;
