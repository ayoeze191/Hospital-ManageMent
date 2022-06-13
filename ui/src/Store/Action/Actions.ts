import { AppDispatch } from "../Store"
import axios from "axios"
import { All_Doctors } from "../Reducer/DoctorReducer"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const get_all_doctors = () => (dispatch:AppDispatch):void => {
    console.log('working')
    axios.get('http://127.0.0.1:8000/Doctors')
            .then((res) =>  {
                console.log(res)
             dispatch(All_Doctors(res.data))
                })
            .catch((err) => {
                console.log(err)
            })
    }

