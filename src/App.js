import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import "./global.css";

import Home from "../src/pages/home/index";


function App() {
  return (
    <Router>
      <div className="container">
        <Routes> 
          <Route path="/" element={<Home />} />       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
