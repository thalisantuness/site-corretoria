import React, { useState, useEffect } from "react";
import { FaCar, FaBath, FaBed, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useImovel } from "../../context/ImovelContext";
import "./styles.css";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

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
      toast.success("Imóvel excluído com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Erro ao excluir imóvel:", error);
      toast.error("Erro ao excluir imóvel. Tente novamente!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="admin-list-container">
      <ToastContainer />
      {notFound ? (
        <div className="not-found-message">
          <h3>Nenhum imóvel encontrado</h3>
          <p>Por favor, ajuste seus filtros de busca</p>
        </div>
      ) : (
        <div className="admin-property-grid">
          {imoveis.map((imovel) => (
            <div key={imovel.imovel_id} className="admin-property-card">
              <div className="property-image-container">
                <img 
                  src={imovel.imageData} 
                  alt={imovel.nome} 
                  className="property-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Imagem+Indisponível';
                  }}
                />
              </div>
              
              <div className="property-details">
                <h3 className="property-title">{imovel.nome}</h3>
                <p className="property-description">{imovel.description}</p>
                
                <div className="property-meta">
                  <span className="property-type">{imovel.tipo.nome}</span>
                  <span className="property-location">{imovel.estado.nome}</span>
                </div>
                
                <div className="property-features">
                  <div className="feature">
                    <FaCar className="feature-icon" />
                    <span>{imovel.n_vagas} {imovel.n_vagas === 1 ? 'vaga' : 'vagas'}</span>
                  </div>
                  <div className="feature">
                    <FaBath className="feature-icon" />
                    <span>{imovel.n_banheiros} {imovel.n_banheiros === 1 ? 'banheiro' : 'banheiros'}</span>
                  </div>
                  <div className="feature">
                    <FaBed className="feature-icon" />
                    <span>{imovel.n_quartos} {imovel.n_quartos === 1 ? 'quarto' : 'quartos'}</span>
                  </div>
                </div>
                
                <div className="property-actions">
                  <Link 
                    to={`/editar-imovel/${imovel.imovel_id}`} 
                    className="edit-button"
                  >
                    <FaEdit /> Editar
                  </Link>
                  <button 
                    onClick={() => handleDelete(imovel.imovel_id)} 
                    className="delete-button"
                  >
                    <FaTrash /> Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImovelListAdmin;