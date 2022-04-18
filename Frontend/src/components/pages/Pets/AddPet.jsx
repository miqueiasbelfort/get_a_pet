import api from "../../../utils/api"

import {useState} from "react"
//css
import styles from "./AddPet.module.css"

import {useNavigate} from "react-router-dom"
//hooks
import useFlashMessage from "../../../hooks/useFlashMessage"
//componentes
import PetForm from "../../form/PetForm"

const AddPet = () => {
  return (
    <section className={styles.addpet_header}>
      <div>
          <h1>Cadastre um Pet</h1>
          <p>Depois ele ficará disponivel para adoção</p>
      </div>
      <PetForm 
        btnText="Cadastrar Pet"
      />
    </section>
  )
}

export default AddPet
