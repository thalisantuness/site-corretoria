import React, { useState, useEffect } from "react";
import { useImovel } from "../../context/ImovelContext";
import { FaCar, FaBath, FaBed } from "react-icons/fa";
import axios from "axios";
import "./style.css";

function ImovelTextDetails() {
  const { imovelId } = useImovel();
  const [imovel, setImovel] = useState(null);

  useEffect(() => {
    const fetchImovel = async () => {
      try {
        const response = await axios.get(`https://api-corretora-production.up.railway.app/imovel/${imovelId}`);
        setImovel(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do imóvel:", error);
      }
    };

    if (imovelId) fetchImovel();
  }, [imovelId]);

  if (!imovel) {
    return <p>Carregando informações do imóvel...</p>;
  }

  return (
    <>
    <div className="item-infos">
      <p>{imovel.description}</p>
      <p>{imovel.tipo.nome}</p>
      <p>{imovel.cidade.nome}</p>
      <p>{imovel.estado.nome}</p>
      </div>

      <div className="item-info-line">
        <div className="item-info-container"><FaCar /> <div className="item-detail">{imovel.n_vagas} vaga</div></div>
        <div className="item-info-container"><FaBath /> <div className="item-detail">{imovel.n_banheiros} banheiro</div></div>
        <div className="item-info-container"><FaBed /> <div className="item-detail">{imovel.n_quartos} quartos</div></div>
      </div>
    </>
  );
}

export default ImovelTextDetails;
