import React, { useState, useEffect } from "react";
import { FaCar, FaBath, FaBed, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useImovel } from "../../context/ImovelContext";
import "./styles.css";

function ImovelListAdmin() {
  const [imoveis, setImoveis] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { filtros } = useImovel();

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const params = new URLSearchParams(filtros);
        const url = `https://api-corretora-production.up.railway.app/imovel${params.toString() ? `?${params}` : ""}`;
        const response = await axios.get(url);
        setImoveis(response.data.length ? response.data : []);
        setNotFound(response.data.length === 0);
      } catch (error) {
        setNotFound(error.response?.status === 404);
        console.error("Erro ao buscar imóveis:", error);
      }
    };

    fetchImoveis();
  }, [filtros]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api-corretora-production.up.railway.app/imovel/${id}`);
      setImoveis(imoveis.filter(imovel => imovel.imovel_id !== id));
    } catch (error) {
      console.error("Erro ao excluir imóvel:", error);
    }
  };

  return (
    <div className="list-container-admin">
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
                <p>{imovel.estado.nome}</p>
                <div className="item-info-line">
                  <div className="item-info-container"><FaCar /> {imovel.n_vagas} vaga</div>
                  <div className="item-info-container"><FaBath /> {imovel.n_banheiros} banheiro</div>
                  <div className="item-info-container"><FaBed /> {imovel.n_quartos} quartos</div>
                </div>
                <button onClick={() => handleDelete(imovel.imovel_id)} className="details-button">
                  <FaTrash /> Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ImovelListAdmin;