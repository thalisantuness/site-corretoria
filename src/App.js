import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ImovelProvider } from "./context/ImovelContext"; // Importando o contexto
import "./global.css";

import Home from "./pages/home";
import ImovelListPage from "./pages/imovel-list";
import ImovelListDetails from "./pages/imovel-details";
import RegisterImovel from "./pages/register-imovel";
import ImovelListAdminPage from "./pages/imovel-list-admin"

function App() {
  return (
    <ImovelProvider> {/* Envolvendo todas as rotas */}
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imovel-list" element={<ImovelListPage />} />
            <Route path="/detalhes-imovel" element={<ImovelListDetails />} /> 
            <Route path="/cadastro-imovel-admin" element={<RegisterImovel />} />   
            <Route path="/imovel-list-admin" element={<ImovelListAdminPage />} />   
          </Routes>
        </div>
      </Router>
    </ImovelProvider>
  );
}

export default App;
