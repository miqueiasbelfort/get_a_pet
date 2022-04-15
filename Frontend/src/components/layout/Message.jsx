import {useState, useEffect} from "react"

import styles from "./Message.module.css"

//utils
import bus from "../../utils/bus"

const Message = () => {
    const [visibility, setVisibility] = useState(false)
    const [message, setMessage] = useState(``)
    const [type, setType] = useState("")

    useEffect(() => {

        bus.addListener('flash', ({message, type}) => {
            setVisibility(true)
            setMessage(message)
            setType(type)

            setTimeout(() => {
                setVisibility(false)
            }, 3000)
        })

    }, [])

  return (

    visibility && (
        <div className={`${styles.message} ${styles[type]}`}>
            {message}
        </div>
    ) 

  )

}

export default Message