import { createStore, applyMiddleware, Store} from 'redux';

// import { composeWithDevTools } from 'redux-devtools-extension';
import composeWithDevTools from 'redux';

import thunk from 'redux-thunk';
// import RootReducer from './Reducer/RootReducer';
import {configureStore} from  "@reduxjs/toolkit"
import DoctorReducer from './Reducer/DoctorReducer';
import AuthReducer from './Reducer/AuthReducer';
import cardReducer from "./Reducer/CardReducer"
import AppointmentReducer from './Reducer/AppointmentReducer';

export const store = configureStore({
    reducer: {
        doctors: DoctorReducer,
        auth: AuthReducer,
        card: cardReducer,
        appointment:AppointmentReducer
    },
    devTools: true
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =  typeof store.dispatch;