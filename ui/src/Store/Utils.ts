import { RootState } from "./Store";

interface configType {
    headers:  {
        "Content-Type":  string,
        "Authorization"?: string
    }
} 


export const tokenConfig = <T extends RootState> (getState:T) => {
    const token = getState.auth.access
    const config:configType = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  
    return config;
  };
