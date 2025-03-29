import React, { useState, useEffect } from "react";
import { useImovel } from "../../context/ImovelContext";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ImovelCarrouselDetail from "../../components/ImovelCarrouselDetail";
import ImovelTextDetails from "../../components/ImovelTextDetails";
import axios from "axios";
import "./style.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ImovelListDetails() {
  const { imovelId } = useImovel();
  const [imovel, setImovel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImovel = async () => {
      try {
        if (imovelId) {
          const response = await axios.get(
            `https://api-corretora-production.up.railway.app/imovel/${imovelId}`
          );
          setImovel(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do imóvel:", error);
      }
    };

    fetchImovel();
  }, [imovelId]);

  if (!imovelId) {
    return <p>Nenhum imóvel selecionado.</p>;
  }

  if (!imovel) {
    return <p>Carregando detalhes do imóvel...</p>;
  }

  const handleBack = () => {
    navigate("/imovel-list");
  };

  return (
    <div className="container">
      <NavBar />
      <div className="imovel-details">
        <button onClick={() => handleBack()}>
          <IoIosArrowRoundBack /> Voltar
        </button>
        <h1>{imovel.nome}</h1>
        <ImovelCarrouselDetail />
        <ImovelTextDetails />
      </div>
      <Footer />
    </div>
  );
}

export default ImovelListDetails;
