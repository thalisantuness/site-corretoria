import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/index";
import Footer from "../../components/Footer/index";
import ImovelListAdmin from "../../components/ImovelListAdmin";
import { Link } from "react-router-dom";
import ReactWhatsappButton from "react-whatsapp-button";
import { FaPlus, FaDoorOpen } from "react-icons/fa";
import "./style.css";

function ImovelListAdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login-admin");
  };

  return (
    <div className="admin-container">
      <ReactWhatsappButton 
        countryCode="81" 
        phoneNumber="92200646"
        className="whatsapp-button"
      />
      
      <NavBar />

      <div className="admin-header">
        <div className="admin-header-content">
          <h1 className="admin-title">Painel Administrativo</h1>
          
          <div className="admin-actions">
            <Link to="/cadastro-imovel-admin" className="admin-add-button">
              <FaPlus className="button-icon" />
              <span>Adicionar Imóvel</span>
            </Link>
            
            <button className="admin-logout-button" onClick={handleLogout}>
              <FaDoorOpen className="button-icon" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      <main className="admin-main-content">
        <ImovelListAdmin />
      </main>

      <Footer />
    </div>
  );
}

export default ImovelListAdminPage;