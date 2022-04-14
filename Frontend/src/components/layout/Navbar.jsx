import {Link} from "react-router-dom"

//css
import styles from "./Navbar.module.css"

import Logo from "../../assents/img/Logo.png"

const Navbar = () => {
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
        <li>
          <Link to="/login">Entrar</Link>
        </li>
        <li>
          <Link to="/register">Cadastrar</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
