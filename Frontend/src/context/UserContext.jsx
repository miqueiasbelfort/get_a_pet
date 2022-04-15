import { createContext } from "react";

// hook
import useAuth from "../hooks/useAuth"

const Context = createContext()

function UserProvider({children}){

    const {register, authenticated} = useAuth()

    return (
        <Context.Provider value={{register, authenticated}}>
            {children}
        </Context.Provider>
    )

}

export {Context, UserProvider}