import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {AppDispatch} from "./../Store"
import axios from "axios"
// import { get_all_doctors } from "../ActionTypes/ActionTypes"
// type fun = () => void



const initialState = {
    email: '',
    cardnumber: '',
    expiredate: null,
    approved: 'Card Not Generated'
}  as  stateTypes

export interface stateTypes {
    email?: string,
    cardnumber?: string,
    expiredate?: Date | null
    approved?: string
} 


const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        cardDetailsApproved: (state, action:PayloadAction<stateTypes>) => {
            state.approved = action.payload.approved
            state.cardnumber = action.payload.cardnumber
            state.email = action.payload.email
            state.expiredate = action.payload.expiredate
        },
        cardDetailsPpending: (state, action:PayloadAction<stateTypes>) => {
            state.approved = action.payload.approved
            state.cardnumber = ''
            state.email = action.payload.email
            state.expiredate = null
        },
        cardNotYetGenerated: (state, action:PayloadAction<stateTypes>) => {
            state.approved = action.payload.approved,
            state.cardnumber = ''
            state.email = action.payload.email
            state.expiredate = null
        }

    },
})


export const {cardDetailsApproved, cardDetailsPpending, cardNotYetGenerated} = cardSlice.actions
export default cardSlice.reducer;

