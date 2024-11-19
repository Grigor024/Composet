import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let url = "http://localhost:3005/belt"


export const getBelt = createAsyncThunk("belt/getBelt", async() => {
    const res = await axios.get(url)
    return res.data 
})

export const BeltSlice = createSlice({
    name: "belt",
    initialState: {
        belt: []
    },
    extraReducers: {
        [getBelt.fulfilled]: (state, action) => {
            state.belt = action.payload
            return state
        }
    }
})
export default BeltSlice.reducer