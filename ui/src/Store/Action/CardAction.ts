import { cardDetailsApproved, cardDetailsPpending,cardNotYetGenerated, stateTypes } from "../Reducer/CardReducer";
import axios from "axios";
import { AppDispatch, RootState,  } from "../Store";
import getCookie from "./csrf";

export const getcardDetails = () => (dispatch:AppDispatch) => {
    const user = localStorage.getItem('user') || null
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
    
    axios.get(`card/getCardDetails/${user}`, tokenConfig())
    .then((res) => {
        let payload:Partial<stateTypes> = {}
        // console.log(res.data.data.patient.patient.email)
        if (res.data.data.cardnumber){
                payload = {
                expiredate: res.data.data.expiredate,
                cardnumber: res.data.data.cardnumber,
                approved: 'Approved',
                email: res.data.data.patient.patient.email
            }
            dispatch(cardDetailsApproved(payload))
        }
        else {
            // console.log(res.data)
            payload = {
                approved: 'Pending',
                email: res.data.data.email
            }
            dispatch(cardDetailsPpending(payload))
        }
    })
    .catch((err) => { 
        const payload = {
            approved: 'Card Not Generated'
        }
        dispatch(cardNotYetGenerated(payload))
    })
}


export const cardRequest = () => (dispatch:AppDispatch) => {
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
          axios.get(`card/request`, tokenConfig())
          .then((res) => {
            //   console.log(res.data)
            const payload = {
                approved: 'Pending',
                email: res.data.data.email
            }
            dispatch(cardDetailsPpending(payload))
          })
          .catch((err) => {
              console.log(err)
          })

}