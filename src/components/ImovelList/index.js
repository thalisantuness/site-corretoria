import React, { useState, useEffect } from "react";
import { FaCar, FaBath, FaBed } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useImovel } from "../../context/ImovelContext";
import "./styles.css";

function ImovelList() {
  const [imoveis, setImoveis] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { filtros, setImovelId  } = useImovel();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        let url = "https://api-corretora-production.up.railway.app/imovel";

        const params = new URLSearchParams();
        if (filtros.cidade_id) params.append("cidade_id", filtros.cidade_id);
        if (filtros.tipo_id) params.append("tipo_id", filtros.tipo_id);
        if (filtros.n_quartos) params.append("n_quartos", filtros.n_quartos);
        if (filtros.n_vagas) params.append("n_vagas", filtros.n_vagas);
        if (filtros.n_banheiros) params.append("n_banheiros", filtros.n_banheiros);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await axios.get(url);
        if (response.data.length === 0) {
          setNotFound(true);
        } else {
          setImoveis(response.data);
          setNotFound(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        } else {
          console.error("Erro ao buscar imóveis:", error);
        }
      }
    };

    fetchImoveis();
  }, [filtros]);

  const handleSelectImovel = (id) => {
    setImovelId(id);
    navigate("/detalhes-imovel");
  };

  return (
    <div className="list-container">
      {notFound ? (
        <h3>Pesquisa não encontrada</h3>
      ) : (
        <ul className="custom-list">
          {imoveis.map((imovel) => (
            <li key={imovel.imovel_id} className="list-item">
              <img src={imovel.imageData} alt={imovel.nome} />
              <div className="container-details-list">
                <h2>{imovel.nome}</h2>
                <p>{imovel.description}</p>
                <p>{imovel.tipo.nome}</p>
                <p className="details-list-localization">{imovel.cidade.nome}</p>
                <p className="details-list-localization">{imovel.estado.nome}</p>
                <div className="item-info-line">
                  <div className="item-info-container">
                    <FaCar /> {imovel.n_vagas} vagas
                  </div>
                  <div className="item-info-container">
                    <FaBath /> {imovel.n_banheiros} banheiros
                  </div>
                  <div className="item-info-container">
                    <FaBed /> {imovel.n_quartos} quartos
                  </div>
                </div>
                <button onClick={() => handleSelectImovel(imovel.imovel_id)} className="details-button">
                  Ver Detalhes
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ImovelList;
