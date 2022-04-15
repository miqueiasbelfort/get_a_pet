import { createContext } from "react";

// hook
import useAuth from "../hooks/useAuth"

const Context = createContext()

function UserProvider({children}){

    const {register} = useAuth()

    return (
        <Context.Provider value={{register}}>
            {children}
        </Context.Provider>
    )

}

export {Context, UserProvider}