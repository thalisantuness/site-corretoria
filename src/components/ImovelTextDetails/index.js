import React from "react";
import { FaCar, FaBath, FaBed, FaRulerCombined, FaMoneyBillWave, FaBuilding } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import "../../pages/imovel-details/style.css";

function ImovelTextDetails({ imovel }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="property-details">
      <div className="property-header">
        <h1 className="property-title">{imovel.nome}</h1>
        <div className="property-location">
          <MdLocationOn className="location-icon" />
          <span>{imovel.cidade.nome}, {imovel.estado.nome}</span>
        </div>
      </div>
      

        <div className="price-container">
          <span className="price-value">{formatCurrency(imovel.valor)}</span>
          {imovel.tipo_transacao === 'Aluguel' && (
            <span className="price-period">/mês</span>
          )}
        </div>
        
        {imovel.valor_condominio > 0 && (
          <div className="condominium-fee">
            <span>Condomínio: {formatCurrency(imovel.valor_condominio)}/mês</span>
          </div>
        )}
   
      
      <div className="property-features">
        <div className="feature-item">
          <FaBed className="feature-icon" />
          <span>{imovel.n_quartos} Quarto{imovel.n_quartos !== 1 ? 's' : ''}</span>
        </div>
        <div className="feature-item">
          <FaBath className="feature-icon" />
          <span>{imovel.n_banheiros} Banheiro{imovel.n_banheiros !== 1 ? 's' : ''}</span>
        </div>
        <div className="feature-item">
          <FaCar className="feature-icon" />
          <span>{imovel.n_vagas} Vaga{imovel.n_vagas !== 1 ? 's' : ''}</span>
        </div>
      
      </div>
      
      <div className="property-description-details">
        <h2 className="section-title">Descrição</h2>
        <p>{imovel.description?.trim() || "Nenhuma descrição disponível."}</p>
      </div>
      
      <div className="property-details-grid">
        <div className="details-section">
          <h3 className="section-title"><FaBuilding /> Características</h3>
          <ul className="details-list">
            <li><strong>Tipo:</strong> {imovel.tipo.nome}</li>
            <li><strong>Transação:</strong> {imovel.tipo_transacao}</li>
          </ul>
        </div>
        
        <div className="details-section">
          <h3 className="section-title"><FaMoneyBillWave /> Custos</h3>
          <ul className="details-list">
            <li><strong>IPTU:</strong> {formatCurrency(imovel.valor_iptu)}/ano</li>
            {imovel.valor_condominio > 0 && (
              <li><strong>Condomínio:</strong> {formatCurrency(imovel.valor_condominio)}/mês</li>
            )}
          </ul>
        </div>
      </div>
      
      <div className="contact-section">
        <a
          href="https://wa.me/5581992200646?text=Ol%C3%A1%2C%20gostei%20de%20um%20im%C3%B3vel%20que%20vi%20no%20seu%20site!"
          className="contact-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar em contato via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default ImovelTextDetails;