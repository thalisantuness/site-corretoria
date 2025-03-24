import React from "react";
import NavBar from "../../components/NavBar/index";
import FormRegister from "../../components/FormRegister/index";
import Footer from "../../components/Footer/index";


import "../../global.css";


function RegisterImovel() {
  return (
    <div className="container">
      <NavBar />
      <FormRegister />
      <Footer /> 
    </div>
  );
}

export default RegisterImovel;
