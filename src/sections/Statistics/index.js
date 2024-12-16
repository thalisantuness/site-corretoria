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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
          animi voluptate esse eveniet velit veritatis fugit nobis excepturi
          neque sit laboriosam fugiat corrupti iste iure, minus, quos laudantium
          repudiandae officiis. Ullam nulla labore quisquam voluptatum porro
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
          <h1>500+</h1>
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
