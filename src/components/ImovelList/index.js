import React, {useState, useEffect} from "react";
import "./styles.css";
import { FaCar, FaBath, FaBed  } from "react-icons/fa";
import axios from "axios";

function ImovelList() {

    const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
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
    <>
    <div className="list-container">
    
  
    
    
    
    
    
    
    
      <ul className="custom-list">
      {imoveis.map((imovel) => (
          <li key={imovel.imovel_id} className="list-item">
            
           
                   <img src={imovel.imageData}/>
                   
                   <div className="container-details-list">
                   <h2>{imovel.nome}</h2>
                   <p>{imovel.description}</p>
                   <p>{imovel.tipo.nome}</p>
                   <p>{imovel.estado.nome}</p>
                   <div className="item-info-line">
                   <div className="item-info-container">
                   <FaCar />
                   <div className="item-detail">{imovel.n_vagas} vaga</div>
                   </div> 
           
                   <div className="item-info-container">
                   <FaBath />
                   <div className="item-detail">{imovel.n_banheiros} banheiro</div>
                   </div> 
                   <div className="item-info-container">
                   <FaBed  />
                   <div className="item-detail">{imovel.n_quartos}  quartos</div>
                   </div> 
                   </div>
                   </div>
               
            </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default ImovelList;
