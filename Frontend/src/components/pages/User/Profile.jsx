import { useState, useEffect } from "react"

//css
import styles from "./Profile.module.css"
import FormStyles from "../../form/Form.module.css"
//components
import Input from "../../form/Input"



const Profile = () => {
    const [user, setUser] = useState('')

    function onFileChange(){}
    function handleChange(){}

  return (
    <div>
        <div className={styles.profile_header}>
            <h1>Perfil</h1>
            <p>Preview Image</p>
        </div>
        <form className={FormStyles.form_container}>
            <Input
                text="Imagem"
                type="file"
                name="image"
                handleOnChange={onFileChange}
            />
            <Input 
                text="E-mail"
                type="email"
                name="email"
                placeholder="Digite o seu E-mail"
                handleOnChange={handleChange}
                value={user.email || ''}
            />
             <Input 
                text="Nome"
                type="text"
                name="name"
                placeholder="Digite o seu nome"
                handleOnChange={handleChange}
                value={user.nome || ''}
            />
             <Input 
                text="Telefone"
                type="text"
                name="phone"
                placeholder="Digite o seu Telefone"
                handleOnChange={handleChange}
                value={user.phone || ''}
            />
             <Input 
                text="Senha"
                type="password"
                name="password"
                placeholder="Digite a sua nova senha"
                handleOnChange={handleChange}
            />
            <Input 
                text="Cofirmação de Senha"
                type="password"
                name="confirmpassword"
                placeholder="Confirme a sua senha"
                handleOnChange={handleChange}
            />
            <input type="submit" value="Editar" />
        </form>
    </div>
  )
}

export default Profile