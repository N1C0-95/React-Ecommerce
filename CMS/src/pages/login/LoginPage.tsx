import { useDebugValue, useEffect } from "react";
import { selectAuthError, selectAuthIsLogged, useAuth } from "../../services/auth";
import { ServerError } from "../../shared";
import { UseLogin } from "./hooks/useLogin"
import { useNavigate } from "react-router-dom";

export function LoginPage(){

    const navigate = useNavigate();
    const error = useAuth(selectAuthError);
    const isLogged = useAuth(selectAuthIsLogged);

    useEffect(() => {
        if(isLogged){
            navigate("/shop")
        }
    }, [isLogged])
    console.log(isLogged)
    
    const {validators, actions,credential} = UseLogin();
    return(
        <div className="page-sm">
        <h1 className="title">
            Login
        </h1>

        {error && <ServerError />}
        <form className="flex flex-col gap-2" onSubmit={actions.doLogin}>
            Username
            <input type="text" name="username" value={credential.username} onChange={actions.changeHandler} placeholder="username" />
            Password
            <input type="password" name="password" value={credential.password} onChange={actions.changeHandler} placeholder="password" />
            <button type="submit" className="btn primary" disabled={!validators.isValid}>SING IN</button>
        </form>
        <pre>{JSON.stringify(credential,null,2)}</pre>
    </div>
    )
}