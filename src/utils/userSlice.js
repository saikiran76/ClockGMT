import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "login",
    initialState:{
        user: null
    },
    reducers:{
        addUser:(state, action)=>{
            return action.payload
        },
        removeUser:(state)=>{
            state.user = null;
        }
    }
})

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
