import React, { useState } from "react";
import { useImovel } from "../../context/ImovelContext";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { FaCar, FaBath, FaBed } from "react-icons/fa";
import "./style.css";

function ImovelListDetails() {
  const { imovelSelecionado } = useImovel();
  const [index, setIndex] = useState(0);

  // Funções para navegação no carrossel
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % imovelSelecionado.photo.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + imovelSelecionado.photo.length) % imovelSelecionado.photo.length);
  };

  if (!imovelSelecionado) {
    return <p>Nenhum imóvel selecionado.</p>;
  }

  return (
    <div className="container">
      <NavBar />
      <div className="imovel-details">
        <h1>{imovelSelecionado.nome}</h1>

      
        <div className="carrousel">
          <button className="prev" onClick={prevSlide}>{"<"}</button>
          
          <div className="carrousel-images">
            {imovelSelecionado.photo?.map((foto, i) => (
              <img
                key={foto.photo_id}
                src={foto.imageData}
                alt={`Foto ${foto.photo_id}`}
                className={i === index ? "active" : "hidden"}
              />
            ))}
          </div>
          
          <button className="next" onClick={nextSlide}>{">"}</button>
        </div>

        <p>{imovelSelecionado.description}</p>
        <p>{imovelSelecionado.tipo.nome}</p>
        <p>{imovelSelecionado.estado.nome}</p>

        <div className="item-info-line">
          <div className="item-info-container">
            <FaCar />
            <div className="item-detail">{imovelSelecionado.n_vagas} vaga</div>
          </div>
          <div className="item-info-container">
            <FaBath />
            <div className="item-detail">{imovelSelecionado.n_banheiros} banheiro</div>
          </div>
          <div className="item-info-container">
            <FaBed />
            <div className="item-detail">{imovelSelecionado.n_quartos} quartos</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ImovelListDetails;
