import React, { useState, useEffect } from "react";
import { FaCar, FaBath, FaBed } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useImovel } from "../../context/ImovelContext";
import "./styles.css";

function ImovelList() {
  const [imoveis, setImoveis] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { filtros, setImovelId } = useImovel();
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
        if (filtros.n_banheiros)
          params.append("n_banheiros", filtros.n_banheiros);

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
        <div className="imoveis-grid">
          {imoveis.map((imovel) => (
            <div
              key={imovel.imovel_id}
              className="imovel-card"
              onClick={() => handleSelectImovel(imovel.imovel_id)}
            >
              <img
                src={imovel.imageData}
                alt={imovel.nome}
                className="imovel-image"
              />
              <div className="imovel-details">
                <h2>{imovel.nome}</h2>
                <p className="imovel-description">{imovel.description}</p>
                <p className="imovel-type">{imovel.tipo.nome}</p>

                <p className="imovel-price">Valor: {imovel.valor}</p>
                <p className="imovel-condominio">
                  Condomínio: {imovel.valor_condominio}
                </p>

                <p className="imovel-location">
                  {imovel.cidade.nome}, {imovel.estado.nome}
                </p>

                <div className="imovel-features">
                  <div className="feature">
                    <FaCar /> {imovel.n_vagas}
                  </div>
                  <div className="feature">
                    <FaBath /> {imovel.n_banheiros}
                  </div>
                  <div className="feature">
                    <FaBed /> {imovel.n_quartos}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImovelList;
