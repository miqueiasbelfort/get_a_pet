import { useContext } from "react"

import {Link} from "react-router-dom"

//css
import styles from "./Navbar.module.css"
import Logo from "../../assents/img/Logo.png"

//context
import {Context} from "../../context/UserContext"


const Navbar = () => {

  const {authenticated, logout} = useContext(Context)

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="get a pet" />
        <h2>GET A PET</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {
          authenticated ? (
            <>
              <li>
                <Link to="/user/profile">Perfil</Link>
              </li>
              <li onClick={logout}>Sair</li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Entrar</Link>
              </li>
              <li>
                <Link to="/register">Cadastrar</Link>
              </li>
            </>
          )
        }
      </ul>
    </nav>
  )
}

export default Navbar
