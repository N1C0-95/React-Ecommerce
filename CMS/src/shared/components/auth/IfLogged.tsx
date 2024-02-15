/* questo componente verrà utilizzato per wrappare le parti del template che volgiamo andare a visualizzare solo quando solo loggato
sitamo introducendo questo compnoente perchè la funzionalità di nascondere parti del template quando non sei loggato
potrebbe essere necessaria per molte funzionalità.
questo componente verifica che sono loggato
*/

import { PropsWithChildren, ReactNode } from "react";
import { selectAuthIsLogged, useAuth } from "../../../services/auth";

interface IfLoggedProps {
    else: ReactNode
}

export function IfLogged(props:PropsWithChildren<IfLoggedProps>,) {

    const isLogged = useAuth(selectAuthIsLogged)
    return(
        <>
            {isLogged ? props.children : props.else}
        </>
    )
}