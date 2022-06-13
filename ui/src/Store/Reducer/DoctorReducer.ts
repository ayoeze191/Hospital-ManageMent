import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {AppDispatch} from "./../Store"
import axios from "axios"
// import { get_all_doctors } from "../ActionTypes/ActionTypes"
// type fun = () => void



const initialState = {
    doctors: [],
    loading:  false
}  as  stateTypes

interface stateTypes {
    doctors: object[]
    loading: boolean
} 


const doctorsSlice = createSlice({
    name: "doctors",
    initialState,
    reducers: {
        All_Doctors: (state, action:PayloadAction<object[]>) => {
            state.doctors  =  action.payload
            state.loading  =  false
        },
        doctor_loading: (state) => {
            state.doctors  = []
            state.loading = true
        }
    },
    extraReducers: {
        
    }
})


export const {All_Doctors} = doctorsSlice.actions


export default doctorsSlice.reducer;

