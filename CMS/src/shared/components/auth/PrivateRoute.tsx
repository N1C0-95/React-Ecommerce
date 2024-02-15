import { PropsWithChildren } from "react";
import { selectAuthIsLogged, useAuth } from "../../../services/auth";
import { Navigate } from "react-router-dom";

/* 
    lo scopo di questo componente è lo stesso di isLogged, soltanto che in questo caso
    quello che vogliamo fare è andare a proteggere le rotte.
*/
export function PrivateRoute(props:PropsWithChildren) {
    const isLogged = useAuth(selectAuthIsLogged)
    return(
        <>{
            isLogged ? props.children : <Navigate to={'/login'}/>
        }
            
            
        </>
    )
}