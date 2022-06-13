import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface stateTypes {
    isAuthenticated:  boolean
    access: string | null,
    refresh: string | null,
    user:  string | null,
    isdoctor: boolean,
    isloading: boolean
}


const initialState:stateTypes =  {
    isAuthenticated:  false,
    access:  localStorage.getItem('access') ?? null,
    refresh:  localStorage.getItem('refresh') ?? null,
    user: localStorage.getItem('user') ?? null,
    isdoctor: false,
    isloading: false
}
// interface  actiontypes {
//     access: 
// }

export interface authType {
    access:  string
    refresh:  string
    user: string,
    isdoctor?: boolean
}

const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        AuthSuccess: (state, action:PayloadAction<{isdoctor: boolean, access?:string, refresh?:string, user?: string}>) => {
            
            if(action.payload.access && action.payload.refresh && action.payload.user){
                localStorage.setItem('access', action.payload.access)
                localStorage.setItem('refresh', action.payload.refresh)
                localStorage.setItem('user', action.payload.user)
            }
            
            state.isAuthenticated = true
            state.isdoctor = action.payload.isdoctor!
            state.isloading  = false
        },
        AuthFail: (state, action:PayloadAction) => {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('user')
            state.isAuthenticated = false
            state.refresh = null
            state.isloading =  false
            state.isdoctor = false
        },
        AuthLoading: (state, action:PayloadAction) => {
            state.isAuthenticated = false
            state.refresh = null
            state.user = null
            state.isloading =  true
            state.isdoctor = false
        }
    }
})


export const {AuthSuccess, AuthFail, AuthLoading} = AuthSlice.actions
export default AuthSlice.reducer;