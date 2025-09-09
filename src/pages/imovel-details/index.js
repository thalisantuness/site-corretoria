import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ImovelCarrouselDetail from "../../components/ImovelCarrouselDetail";
import ImovelTextDetails from "../../components/ImovelTextDetails";
import axios from "axios";
import "./style.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

function ImovelListDetails() {
    //teste
  const { id } = useParams();
  const [imovel, setImovel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImovel = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `https://api-corretora-production.up.railway.app/imovel/${id}`
          );
          setImovel(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do imóvel:", error);
      }
    };

    fetchImovel();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!imovel) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando detalhes do imóvel...</p>
      </div>
    );
  }

  return (
    <div className="imovel-details-page">
      <NavBar />
      
      <div className="imovel-details-container">
        <button onClick={handleBack} className="back-button">
          <IoIosArrowBack className="back-icon" />
          Voltar para lista
        </button>
        
        <div className="imovel-content-wrapper">
          <div className="imovel-media-section">
            <ImovelCarrouselDetail imovel={imovel} />
          </div>
          
          <div className="imovel-info-section">
            <ImovelTextDetails imovel={imovel} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ImovelListDetails;