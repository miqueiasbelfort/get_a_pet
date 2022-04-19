import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import api from "../../../utils/api"

//css
import styles from "./Dashboard.module.css"

import RoundedImage from "../../layout/RoundedImage"
//hooks
import useFlashMessage from "../../../hooks/useFlashMessage"

const MyPets = () => {
  const [pets, setPets] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const {setFlashMessage} = useFlashMessage()

  useEffect(() => {
    api.get("/pets/mypets", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then(response => {
      setPets(response.data.pets)
    })
  }, [token])

  return (
    <section>
        <div className={styles.petlist_header}>
          <h1>MyPets</h1>
          <Link to="/pet/add">Cadastrar Pet</Link>
        </div>
        <div className={styles.petlist_container}>
          {pets.length > 0 && (
            pets.map((pet) => (
               <div key={pet._id} className={styles.petlist_row}>
                 <RoundedImage
                    src={`http://localhost:5000/images/pets/${pet.images[0]}`}
                    alt={pet.name}
                    width="px75"
                 />
                  <span className='bold'>{pet.name}</span>
                  <div className={styles.action}>
                    {pet.available ? (
                      <>
                        {pet.adopter && (
                          <button className={styles.conclude_btn} >Concluir adoção</button>
                        )}
                        <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                        <button>Excluir</button>
                      </>
                    ) : (
                      <p>Pet já adotado!</p>
                    )}
                  </div>
               </div> 
            ))
          )}
          {pets.length === 0 && <p>Não tem pets cadastrads</p>}
        </div>
    </section>
  )
}

export default MyPets