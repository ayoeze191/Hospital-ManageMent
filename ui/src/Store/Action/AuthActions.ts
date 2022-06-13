import { AppDispatch } from "../Store"
import axios from "axios"
import { AuthFail, AuthLoading, AuthSuccess, authType} from "../Reducer/AuthReducer"
import getCookie from "./csrf"



interface loginPayloadType{
    email: string,
    password: string
}

export const UserLogin = <T extends loginPayloadType> (payload:T) => (dispatch:AppDispatch):void => {
    // dispatch(AuthLoading())
    const csrftoken = getCookie('csrftoken');
    const tokenConfig = () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrftoken!,
          },
        };
      
        return config;
      };
    axios.post('auth/login/',  payload, tokenConfig())
    .then((res) => {
        
        const payload = {
            isdoctor: res.data.user.is_Doctor,
            access:  res.data.access,
            refresh:  res.data.refresh,
            user: res.data.user.id
        }  
        dispatch(AuthSuccess(payload))
    })
    .catch((err) => {
        console.log(err)
        dispatch(AuthFail()) 
    })  
}


// the action to get user whenever a component just mount
export const  getUser = () => (dispatch:AppDispatch) => {
    const refresh = localStorage.getItem('refresh')!
    const access = localStorage.getItem('access')
    if(refresh != null && access != null){
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
    
        axios.get('auth/get_user/', tokenConfig())
        .then((res) => {
            // console.log(res)
            const payload = {
                isdoctor: res.data.is_Doctor,
                user: res.data.id
            }  
            dispatch(AuthSuccess(payload))
        })
        .catch((err) =>  {
            dispatch(AuthFail()) 
        })
    }
    
}

interface configheadersType {
    [props: string]: {
        "Content-Type": string,
        "X-CSRFToken":  string,
        "Authorization": string
    }
}

export const UserLogout = () => (dispatch:AppDispatch):void => {
    const refresh:string  = localStorage.getItem('refresh')!
    const access:string = localStorage.getItem('access')!
    if(refresh){
        const csrftoken = getCookie('csrftoken');
        const tokenConfig = () => {
            let config:Partial<configheadersType> 
            config = {
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken!,
                'Authorization': ''
              },
            };
            
            config.headers!["Authorization"] = `Bearer ${access}`;
            return config;
          }

    dispatch(AuthLoading())
    if(refresh) {
        axios.post('auth/Logout/', {refresh:refresh}, tokenConfig())
        .then((res) => 
        dispatch(AuthFail())
        )
        .catch((err) => {
            console.log(err.response)
        })
    }
}
}
