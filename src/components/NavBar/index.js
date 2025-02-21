import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./styles.css";

export default function NavBar() {
  return (
    <header className="navbar">
      <Link to="/">
        <img src={Logo} className="logo-img" alt="Logo" />
      </Link>

      <div className="links">
        <Link to="/imovel-list">Imóveis</Link>
        {/* <Link className="link" to="/contato">Contato</Link>
        <Link className="link" to="/sobre-nos">Sobre nós</Link> */}
      </div>
    </header>
  );
}
