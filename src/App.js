import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import "./global.css";

import Home from "../src/pages/home/index";
import ImovelListPage from "../src/pages/imovel-list/index";


function App() {
  return (
    <Router>
      <div className="container">
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/imovel-list" element={<ImovelListPage />} />              
        </Routes>
      </div>
    </Router>
  );
}

export default App;
