import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ImovelProvider } from "./context/ImovelContext";
import "./global.css";

import Home from "./pages/home";
import ImovelListPage from "./pages/imovel-list";
import ImovelListDetails from "./pages/imovel-details";
import RegisterImovel from "./pages/register-imovel-admin";
import ImovelListAdminPage from "./pages/imovel-list-admin";
import LoginAdmin from "./pages/login-admin";
import ProtectRoute from "./components/ProtectRoute";
import EditImovel from "./pages/edit-imovel-admin";

function App() {
  return (
    <ImovelProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imovel-list" element={<ImovelListPage />} />
            <Route path="/detalhes-imovel/:id" element={<ImovelListDetails />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route
              path="/editar-imovel/:id"
              element={<ProtectRoute element={<EditImovel />} />}
            />

            <Route
              path="/cadastro-imovel-admin"
              element={<ProtectRoute element={<RegisterImovel />} />}
            />
            <Route
              path="/imovel-list-admin"
              element={<ProtectRoute element={<ImovelListAdminPage />} />}
            />
          </Routes>
        </div>
      </Router>
    </ImovelProvider>
  );
}

export default App;
