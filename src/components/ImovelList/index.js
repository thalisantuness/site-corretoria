import React, { useState, useEffect } from "react";
import { FaCar, FaBath, FaBed, FaBuilding } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useImovel } from "../../context/ImovelContext";
import "./styles.css";

function ImovelList() {
  const [imoveis, setImoveis] = useState([]);
  const [notFound, setNotFound] = useState(false);
  // O 'setImovelId' foi removido pois não será mais necessário no contexto
  const { filtros } = useImovel();
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

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
    navigate(`/detalhes-imovel/${id}`);
  };

  return (
    <div className="admin-list-container">
      {notFound ? (
        <div className="not-found-message">
          <h3>Nenhum imóvel encontrado</h3>
          <p>Tente ajustar os filtros de busca</p>
        </div>
      ) : (
        <div className="admin-property-grid">
          {imoveis.map((imovel) => (
            <div
              key={imovel.imovel_id}
              className="admin-property-card"
              onClick={() => handleSelectImovel(imovel.imovel_id)}
            >
              <div className="property-image-container">
                <img
                  src={imovel.imageData}
                  alt={imovel.nome}
                  className="property-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Imagem+Indisponível';
                  }}
                />
              </div>
              
              <div className="property-details">
                <h3 className="property-title">{imovel.nome}</h3>
                <p className="property-description">{imovel.description}</p>
                
                <div className="property-meta">
                  <span className="property-type">
                    <FaBuilding className="type-icon" /> {imovel.tipo.nome}
                  </span>
                  <span className="property-location">
                    <MdLocationOn className="location-icon" /> {imovel.cidade.nome}, {imovel.estado.nome}
                  </span>
                </div>
                
                <div className="price-container">
                  <span className="price-value">{formatCurrency(imovel.valor)}</span>
                  {imovel.tipo_transacao === 'Aluguel' && (
                    <span className="price-period">/mês</span>
                  )}
                </div>
                
                {imovel.valor_condominio > 0 && (
                  <div className="condominium-fee">
                    <span>Condomínio: {formatCurrency(imovel.valor_condominio)}/mês</span>
                  </div>
                )}

                <div className="property-features">
                  <div className="feature">
                    <FaBed className="feature-icon" />
                    <span>{imovel.n_quartos} {imovel.n_quartos === 1 ? 'quarto' : 'quartos'}</span>
                  </div>
                  <div className="feature">
                    <FaBath className="feature-icon" />
                    <span>{imovel.n_banheiros} {imovel.n_banheiros === 1 ? 'banheiro' : 'banheiros'}</span>
                  </div>
                  <div className="feature">
                    <FaCar className="feature-icon" />
                    <span>{imovel.n_vagas} {imovel.n_vagas === 1 ? 'vaga' : 'vagas'}</span>
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