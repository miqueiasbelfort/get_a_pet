// acesso api
import api from "../utils/api"

// hooks
import { useState, useEffect } from "react"
//import {useHistory} from "react-router-dom"

export default function useAuth() {

    async function register(user){
        
        try {
            const data = await api.post('/users/register', user).then(response => {
                return response.data
            })
            console.log(data)

        } catch(err) {
            // tratar o erro
            console.log(err)
        }

    }
    return {register}

}