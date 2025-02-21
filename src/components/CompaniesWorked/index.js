import React, {useState, useEffect} from "react";
import "./styles.css";
import ReactSimplyCarousel from 'react-simply-carousel';
import casa1 from "../../assets/casa-1.png"
import casa2 from "../../assets/casa-2.png"
import casa3 from "../../assets/casa-3.png"
import { FaCar, FaBath, FaBed  } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

function Companies() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [imoveis, setImoveis] = useState([]);
 
  const fetchImoveis = async () => {
    try {
      const response = await axios.get(
        "https://api-corretora-production.up.railway.app/imovel"
      );
      setImoveis(response.data); 
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
    }
  };

  useEffect(() => {
    fetchImoveis();
  }, []);

  return (
    <div className="companies-container">
    

     <div className="call-imoveis-section">
      <p>Encontre os melhores imóveis selecionados para você!</p>
      <Link className="call-imoveis-button"to="/imovel-list">Confira</Link>
     </div>

 
    </div>
  );
}
export default Companies;