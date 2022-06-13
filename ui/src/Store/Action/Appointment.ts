import axios from "axios";
import { getAppointments } from "../Reducer/AppointmentReducer";
import { AppDispatch } from "../Store";
import getCookie from "./csrf";

export const Get_All_Appoinments = () => (dispatch: AppDispatch) => {
    const access = localStorage.getItem('access') || null
    
        const csrftoken = getCookie('csrftoken');
        const tokenConfig = () => {
            const config = {
              headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken!,
                'Authorization': ''
              },
            };
            config.headers!["Authorization"] = `Bearer ${access}`;
            
            return config;
          }

    axios.get('appointment/allApointment/', tokenConfig())
    .then((res) => {
        // console.log(res.data)
        dispatch(getAppointments(res.data))
    })
}