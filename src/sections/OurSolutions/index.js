import React from "react";
import Check from "../../assets/building.png";
import Xadrez from "../../assets/house.png"
import Regua from "../../assets/commerce-room.png"
import Couple from "../../assets/couple.png"
import Roll from "react-reveal/Roll";
import "./styles.css";

function OurSolutions() {
  return (
    <> 
        <Roll left>
        <div className="second-section">   
         
          <div className="left-section">
            <h1>Confira</h1> 
            <p>Oferecemos uma ampla e diversificada variedade de apartamentos, casas e salas comerciais disponíveis para venda e aluguel em Recife e toda a região.</p>
            <img src={Couple} />
           </div>
          
   

        <div className="right-section">
           
           <div className="right-section-values">
            <img className="text-item-img" src={Check} alt="Check Icon" />
            <h2> Apartamentos </h2>
            </div>    

            <div className="right-section-values">
            <img  src={Regua} alt="Check Icon" />
            <h2>Casas</h2>
            </div>      

            
            <div className="right-section-values">
            <img src={Xadrez} alt="Check Icon" />
            <h2> Salas Comerciais </h2>
            </div>   

             

            </div>
          
          </div>


    
        </Roll>
    </>
  );
}

export default OurSolutions;
