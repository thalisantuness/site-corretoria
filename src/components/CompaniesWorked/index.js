import React, {useState, useEffect} from "react";
import "./styles.css";
import ReactSimplyCarousel from 'react-simply-carousel';
import casa1 from "../../assets/casa-1.png"
import casa2 from "../../assets/casa-2.png"
import casa3 from "../../assets/casa-3.png"
import { FaCar, FaBath, FaBed  } from "react-icons/fa";
import axios from "axios";

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
    
      <h1>Imóveis Em Destaque</h1>   
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 40,
            lineHeight: 1,
            textAlign: 'center',
            width: 40,
            marginLeft: 10,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 40,
            lineHeight: 1,
            textAlign: 'center',
            width: 40,
            marginRight: 10,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 2,
            itemsToScroll: 2,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
      >
      
       
   
      {imoveis.map((imovel) => (
        <div className="item-slide" key={imovel.imovel_id}>
        <img src={imovel.imageData}/>
        <h3>{imovel.nome}</h3>
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
        <div className="item-detail"> quartos</div>
        </div> 
        </div>
        </div> 
          ))}
        
    
    
     
      </ReactSimplyCarousel>
    </div>
  );
}
export default Companies;