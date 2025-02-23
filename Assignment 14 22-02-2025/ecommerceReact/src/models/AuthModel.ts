import { User } from "./User";



export interface AuthState{
    user:User | null,
    isAuthenticated:boolean,
    authLoading:boolean,
    error:string | null
    }