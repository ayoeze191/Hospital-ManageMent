import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface stateTypes {
        doctor: string,
        accepted: boolean,
        date: Date,
        start: Date,
        end: Date,
        completed: boolean
}

interface meType {
    appointments: stateTypes[]
}
const initialState:meType = {
    appointments: []
}



export const AppointmentSlice = createSlice({
    name: 'Appoinment',
    initialState,
    reducers: {
        getAppointments: (state, action:PayloadAction<stateTypes[]>) => {
            state.appointments = action.payload
        }
        
    }

})

export default AppointmentSlice.reducer
export const {getAppointments} = AppointmentSlice.actions
