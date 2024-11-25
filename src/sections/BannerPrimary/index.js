import React from "react";
import "./styles.css";
import bannerPrimaryImg from "../../assets/banner-primary.png";

function Highlights() {  
  return (
    <div className="page-container">
      <div className="side-left">
      <h1>Encontre O Imóvel Dos Seus Sonhos</h1>
      <p>
      Vamos abrir as portas para o futuro?</p> 
      <button>Entre em contato</button>
    </div>

      <div className="side-right">
        <img src={bannerPrimaryImg} alt="Banner" />
      </div>
    
    </div>
  );
}

export default Highlights;
