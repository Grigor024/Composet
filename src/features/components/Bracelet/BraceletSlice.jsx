import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


let url = "http://localhost:3005/bracelet"


export const getBracelet = createAsyncThunk("bracelet/getBracelet", async() => {
    const res = await axios.get(url)
    return res.data
})


export const BraceletSlice = createSlice({
    name: "bracelet",
    initialState: {
        bracelet: []
    },
    extraReducers: {
        [getBracelet.fulfilled]: (state, action) => {
            state.bracelet = action.payload
            return state
        }
    }
})
export default BraceletSlice.reducer