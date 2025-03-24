import React from "react";
import NavBar from "../../components/NavBar/index";
import FormLogin from "../../components/FormLogin/index";
import Footer from "../../components/Footer/index";


import "../../global.css";


function LoginAdmin() {
  return (
    <div className="container">
      <NavBar />
      <FormLogin />
      <Footer /> 
    </div>
  );
}

export default LoginAdmin;
