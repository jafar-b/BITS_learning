import { createContext, Dispatch, useReducer } from "react"

type AuthState = {
  isAuthenticated: boolean
  username:string|null;
  isAdmin:boolean;
}

interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAdmin:false,
  username:null
}

export type AuthAction=|{type:"LOGIN";payload:{username:string,isAdmin:boolean}}|
  {type:"LOGOUT"}


const authReducer=(state:AuthState,action:AuthAction):AuthState=>{
  switch(action.type){
      case "LOGIN":return {isAuthenticated:true,username:action.payload.username,isAdmin:action.payload.isAdmin}
      case "LOGOUT":return {isAuthenticated:false,username:null,isAdmin:false}
      default:return state;
  } 
}

 
export const AuthContext=createContext<AuthContextProps>({
  state:initialState,
  dispatch:()=>null
})

export const AuthProvider =({children}:{children:React.ReactNode})=>{
const [state,dispatch]=useReducer(authReducer,initialState);

  return (
    <AuthContext.Provider value={ {state,dispatch}}>{children}</AuthContext.Provider>
  )
}



