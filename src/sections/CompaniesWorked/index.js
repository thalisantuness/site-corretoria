import React, {useState} from "react";
import "./styles.css";
import ReactSimplyCarousel from 'react-simply-carousel';
import casa1 from "../../assets/casa-1.png"
import casa2 from "../../assets/casa-2.png"
import casa3 from "../../assets/casa-3.png"
import { FaCar, FaBath, FaBed  } from "react-icons/fa";

function Companies() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
 

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
      
        <div style={{ width: 400, height: 400}}>
          <div className="item-slide">
            <img src={casa1}/>
            <h3>Casa em Santo Amaro - Recife - PE</h3>
            
        <div className="item-info-line">

            <div className="item-info-container">
            <FaCar />
            <div className="item-detail">1 vaga</div>
            </div> 

            <div className="item-info-container">
            <FaBath />
            <div className="item-detail">1 banheiro</div>
            </div> 

            <div className="item-info-container">
            <FaBed  />
            <div className="item-detail">2 quartos</div>
            </div> 

            </div>

            </div>
        </div>
        <div style={{ width: 400, height: 400}}>
        <div className="item-slide">
        <img src={casa2}/>
        <h3>Casa em Santo Amaro - Recife - PE</h3>
        <div className="item-info-line">

<div className="item-info-container">
<FaCar />
<div className="item-detail">1 vaga</div>
</div> 

<div className="item-info-container">
<FaBath />
<div className="item-detail">1 banheiro</div>
</div> 

<div className="item-info-container">
<FaBed  />
<div className="item-detail">2 quartos</div>
</div> 

</div>
          </div> 
        </div>
        <div style={{ width: 400, height: 400 }}>
        <div className="item-slide">
        <img src={casa3}/>
        <h3>Casa em Santo Amaro - Recife - PE</h3>
        <div className="item-info-line">

<div className="item-info-container">
<FaCar />
<div className="item-detail">1 vaga</div>
</div> 

<div className="item-info-container">
<FaBath />
<div className="item-detail">1 banheiro</div>
</div> 

<div className="item-info-container">
<FaBed  />
<div className="item-detail">2 quartos</div>
</div> 

</div>
          </div> 
        </div>
    
     
      </ReactSimplyCarousel>
    </div>
  );
}
export default Companies;