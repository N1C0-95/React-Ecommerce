import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/auth";

export function UseLogin(){

    const login = useAuth(state => state.login);
    
    const [credential, setCredential] = useState({username:"", password:""});
    const navigate = useNavigate();
    const isValid = credential.username.length && credential.password.length

    function changeHandler(e:ChangeEvent<HTMLInputElement>){
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        setCredential(state =>({ ...state , [name]:value}))
    }

    function doLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        login(credential.username,credential.password)
       


    }

    return {
        validators:{
            isValid,
            
        },
        actions : {
            changeHandler,
            doLogin
        },
        credential
        
    }
}