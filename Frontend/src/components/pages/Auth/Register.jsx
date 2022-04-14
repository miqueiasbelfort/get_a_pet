import {Link} from "react-router-dom"
import { useContext, useState } from "react"

//components
import Input from "../../form/Input"
//css
import styles from "../../form/Form.module.css"
//Context
import { Context } from "../../../context/UserContext"


const Register = () => {

  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange(e){ //Pegar todos os elementos do form
    setUser({...user, [e.target.name]: e.target.value})
  }

  function handleSubmit(e){ //Quando o evento de submit for ativado
    e.preventDefault()
    //Enviar o usuário par o banco
    register(user)
  }

  return (
    <section className={styles.form_container}>
        <h1>Registrar</h1>
        <form onSubmit={handleSubmit /*O onSubmit é o evento de quando o form for enviado*/}>
            <Input
              text="Nome"
              type="text"
              name="name"
              placeholder="Digite o seu nome"
              handleOnChange={handleChange}
            />
            <Input
              text="Telofone"
              type="text"
              name="phone"
              placeholder="Digite o seu número"
              handleOnChange={handleChange}
            />
            <Input
              text="E-email"
              type="email"
              name="email"
              placeholder="Digite o seu E-mail"
              handleOnChange={handleChange}
            />
            <Input
              text="Senha"
              type="password"
              name="password"
              placeholder="Digite a sua senha"
              handleOnChange={handleChange}
            />
            <Input
              text="Confirmar Senha"
              type="password"
              name="confirmpassword"
              placeholder="Confirme a sua senha"
              handleOnChange={handleChange}
            />
            <input type="submit" value="Cadastrar" />
        </form>
        <p>Já tem conta? <Link to="/login">Clique aqui!</Link></p>
    </section>
  )
}

export default Register