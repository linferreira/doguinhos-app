import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Doguinhos } from "../../assets/dogs.svg";
import { UserContext } from "../../UserContext";
import styles from "./index.module.css";

const Header = () => {
  const { data } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Doghinhos - Home">
          <Doguinhos />
        </Link>
        {data ? (
          <Link className={styles.login} to="/conta">
            {data.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
