import React, { useState } from "react";
import { useImovel } from "../../context/ImovelContext";

import "./style.css";

function Caroussel() {
  const { imagens } = useImovel(); 
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % imagens.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + imagens.length) % imagens.length);
  };

  return (
    <div className="carrousel">
      <button className="prev" onClick={prevSlide}>{"<"}</button>
      
      <div className="carrousel-images">
        {imagens.map((img, i) => (
          <img 
            key={i} 
            src={img} 
            alt={`Slide ${i}`} 
            className={i === index ? "active" : "hidden"} 
          />
        ))}
      </div>

      <button className="next" onClick={nextSlide}>{">"}</button>
    </div>
  );
}

export default Caroussel;
