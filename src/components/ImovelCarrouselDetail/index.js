import React, { useState, useEffect } from "react";
import { useImovel } from "../../context/ImovelContext";
import axios from "axios";
import "./style.css";

function ImovelCarrouselDetail() {
  const { imovelId } = useImovel();
  const [imovel, setImovel] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchImovel = async () => {
      try {
        const response = await axios.get(`https://api-corretora-production.up.railway.app/imovel/${imovelId}`);
        setImovel(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do imóvel:", error);
      }
    };

    if (imovelId) fetchImovel();
  }, [imovelId]);

  if (!imovel) {
    return <p>Carregando detalhes do imóvel...</p>;
  }

  return (
    <div className="carrousel">
    <button
  className="prev"
  onClick={() => setIndex((prev) => (prev - 1 + imovel.photos.length) % imovel.photos.length)}
>
  {"<"}
</button>

<div className="carrousel-images">
  {imovel.photos?.map((foto, i) => (
    <img
      key={foto.photo_id}
      src={foto.imageData}
      alt={`Foto ${foto.photo_id}`}
      className={i === index ? "active" : "hidden"}
    />
  ))}
</div>

<button
  className="next"
  onClick={() => setIndex((prev) => (prev + 1) % imovel.photos.length)}
>
  {">"}
</button>
    </div>
  );
}

export default ImovelCarrouselDetail;
