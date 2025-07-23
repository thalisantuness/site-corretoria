import React from "react";
import "./styles.css";
import Roll from "react-reveal/Roll";

function Statistics() {
  return (
    <>
        <Roll right>
    <div className="statistics-container">
          <div className="statistics-right">
        <h1>Esteja Com Quem Entende</h1>
        <p>
        No mundo dos imóveis, contar com especialistas faz toda a diferença. Com experiência, transparência e compromisso, encontramos o lugar perfeito para você, seja para morar ou investir. Transforme seu sonho em realidade com quem entende do mercado!
        </p>
        <a href="">Saiba Mais →</a>
      </div>



      <div className="statistics-left">
       
       <div className="first-row">

        <div className="statistic">
          <h1>100%</h1>
          <p>Garantia de satisfação do cliente</p>
        </div>


        <div className="statistic"> 
          <h1>60+</h1>
          <p>Imóveis vendidos</p>
        </div>

        </div>

        <div className="second-row">

        <div className="statistic ">
          <h1>15+</h1>
          <p>Anos No Mercado</p>
        </div>

        <div className="statistic">
          <h1>24+</h1>
          <p>Clientes Ativos</p>
        </div>

        </div>

      </div>

    
      
   

  
    </div>
    </Roll>
    </>
  );
}

export default Statistics;
