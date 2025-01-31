import React from "react";
import "./styles.css";
import { TypeAnimation } from 'react-type-animation';

function Highlights() {  
  return (
    <div className="page-container">
    
    <TypeAnimation
      sequence={[
       
        'Encontre O Imóvel Dos Seus Sonhos',
        1000, 
        'Encontre A Casa Dos Seus Sonhos',
        1000,
        'Encontre O Apartamento Dos Seus Sonhos',
        1000,
        'Encontre A Sala Comercial Dos Seus Sonhos',
        1000
      ]}
      wrapper="h1"
      speed={50}
      style={{ fontSize: '40px', display: 'inline-block' }}
      repeat={Infinity}
    />

      <p> 
      Vamos abrir as portas para o futuro?</p> 
      <button>Entre em contato</button>



    
    </div>
  );
}

export default Highlights;
