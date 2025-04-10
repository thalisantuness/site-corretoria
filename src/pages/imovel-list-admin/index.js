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
    <div className="imovels-container">
      <ReactWhatsappButton countryCode="81" phoneNumber="92200646" />
      <NavBar />

      <div className="container-initial-admin">
        <h1>Painel do Admin</h1>

        <Link to="/cadastro-imovel-admin" className="navigate-register-admin">
          <button>
            <FaPlus className="button-register-admin" />
            Adicionar Imóveis
          </button>
        </Link>

        <button className="logout-button" onClick={handleLogout}>
          <FaDoorOpen className="button-left-door" />
          Sair
        </button>
      </div>

      <ImovelListAdmin />
      <Footer />
    </div>
  );
}

export default ImovelListAdminPage;
