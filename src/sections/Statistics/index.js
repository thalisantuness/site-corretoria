import React from "react";
import "./styles.css";

function Statistics() {
  return (
    <div className="statistics-container">
      <div className="statistics-left  backgroundStatistics">
        <div className="statistic">
          <h1>100%</h1>
          <p>Garantia de satisfação do cliente</p>
        </div>
        <div className="statistic">
          <h1>500+</h1>
          <p>Imóveis vendidos</p>
        </div>
      </div>
      <div className="statistics-right">
        <div className="statistic ">
          <h1>3+</h1>
          <p>Anos No Mercado</p>
        </div>
        <div className="statistic">
          <h1>24+</h1>
          <p>Clientes Ativos</p>
        </div>
      </div>

      <div className="textStatistics backgroundText">
        <h1>Esteja Com Quem Entende</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
          animi voluptate esse eveniet velit veritatis fugit nobis excepturi
          neque sit laboriosam fugiat corrupti iste iure, minus, quos laudantium
          repudiandae officiis. Ullam nulla labore quisquam voluptatum porro
        </p>
        <a href="">Saiba Mais →</a>
      </div>
    </div>
  );
}

export default Statistics;
