import React, { useState } from "react";
import "../../pages/imovel-details/style.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ImovelCarrouselDetail({ imovel }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === imovel.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? imovel.photos.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!imovel?.photos?.length) {
    return (
      <div className="no-photos">
        <p>Nenhuma foto disponível para este imóvel</p>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <div className="main-carousel">
        <button onClick={prevSlide} className="carousel-button prev">
          <FaChevronLeft />
        </button>
        
        <div className="slide-container">
          <img 
            src={imovel.photos[currentIndex].imageData} 
            alt={`Imóvel ${currentIndex + 1}`} 
            className="active-slide"
          />
        </div>
        
        <button onClick={nextSlide} className="carousel-button next">
          <FaChevronRight />
        </button>
      </div>
      
      <div className="thumbnails-container">
        {imovel.photos.map((photo, index) => (
          <div 
            key={index}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            <img 
              src={photo.imageData} 
              alt={`Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImovelCarrouselDetail;