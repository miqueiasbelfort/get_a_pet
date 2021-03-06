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

  async function removePet(id){

    let msgType = "success"
    const data = await api.delete(`/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(response => {

      //Atualizar sem prcisar de frameworks
      const updatedPets = pets.filter(pet => pet._id !== id) //pegar todos os pets menos o que tem o id passado como parametro
      setPets(updatedPets) //retornar ele no pets
      return response.data

    }).catch(err => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  async function conludeAdoption(id){
    let msgType = "success"

    const data = await api.patch(`/pets/conclude/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(response => response.data).catch(err => {
      msgType = "errro"
      return err.response.data
    })
  }

  return (
    <section>
        <div className={styles.petlist_header}>
          <h1>Meus Pets</h1>
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
                          <button className={styles.conclude_btn} onClick={() => {
                            conludeAdoption(pet._id)
                          }}>Concluir ado????o</button>
                        )}
                        <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                        <button onClick={() => removePet(pet._id)}>Excluir</button>
                      </>
                    ) : (
                      <p>Pet j?? adotado!</p>
                    )}
                  </div>
               </div> 
            ))
          )}
          {pets.length === 0 && <p>N??o tem pets cadastrads</p>}
        </div>
    </section>
  )
}

export default MyPets