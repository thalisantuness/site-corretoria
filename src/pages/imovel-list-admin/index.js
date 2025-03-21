import React from "react";
import NavBar from "../../components/NavBar/index";
import Footer from "../../components/Footer/index";
import ImovelListAdmin from "../../components/ImovelListAdmin";
import { Link } from "react-router-dom";
import ReactWhatsappButton from "react-whatsapp-button";


import  "./style.css"
import "../../global.css";


function ImovelListAdminPage() {
  return (
    <div className="imovels-container">
      <ReactWhatsappButton countryCode="81" phoneNumber="92200646"/>
      <NavBar />

<div className="container-initial-admin">
      <h1>Painel do admin</h1>

      <Link to="/cadastro-imovel-admin" className="navigate-register-admin">
       Adicionar Imóveis
      </Link>
  
      </div>

   <ImovelListAdmin />
  
    
      {/* <Blog /> */}
      <Footer /> 
    </div>
  );
}

export default ImovelListAdminPage;
