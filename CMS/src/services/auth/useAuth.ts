import { create } from "zustand";
import * as AuthService from './authApi'

export interface AuthState {
    token : string|null;
    isLogged : boolean;
    error : boolean;
    login : (username:string, password:string) => void;
    logout : ()=> void;
}

export const useAuth = create<AuthState>((set) => ({
    token : AuthService.getToken(), 
    error: false,
    isLogged: AuthService.isLogged(),
    login : async (username:string, password:string) => {
        set({isLogged:false, error:false})

        try{
            await AuthService.login(username,password);
            set({isLogged:AuthService.isLogged(), token:AuthService.getToken()})
        }
        catch(e){
            set({isLogged:false, error:true})
        }

    },logout : async() => {
        await AuthService.logout();
        set({isLogged:false,token:null})
    }
}))