import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import "./styles.css";

export default function NavBar() {

return (

<header className="navbar">

  <a href="/" target="_blank">
  <img src={Logo} className="logo-img" alt="Logo" />
  </a>
   
<div className="links">
  <a href="">
    Imóveis
  </a>
  
  <a className="link" href="">
   Contato
  </a>
 
  <a className="link" href="">
   Sobre nós
  </a>

</div>

</header>
  );
}