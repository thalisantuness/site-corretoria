import React, { useState, useEffect } from "react";
import axios from "axios";
import { useImovel } from "../../context/ImovelContext";
import "./styles.css"

function ImovelFilter() {
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedRooms, setSelectedRooms] = useState("");
  const [selectedParking, setSelectedParking] = useState("");
  const [selectedBathrooms, setSelectedBathrooms] = useState("");

  const { setFiltros } = useImovel();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("https://api-corretora-production.up.railway.app/cidades");
        setCities(response.data);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await axios.get("https://api-corretora-production.up.railway.app/tipos");
        setTypes(response.data);
      } catch (error) {
        console.error("Erro ao buscar tipos de imóvel:", error);
      }
    };

    fetchCities();
    fetchTypes();
  }, []);

  const handleFilter = () => {
    setFiltros({
      cidade_id: selectedCity,
      tipo_id: selectedType,
      n_quartos: selectedRooms,
      n_vagas: selectedParking,
      n_banheiros: selectedBathrooms,
    });
  };

  return (
    <div className="section-filters">
      <h2>Filtros</h2>

      <div className="select-container">
        <label htmlFor="city-select">Selecione uma cidade:</label>
        <select id="city-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="custom-select">
          <option value="">-- Escolha uma cidade --</option>
          {cities.map((city) => (
            <option key={city.cidade_id} value={city.cidade_id}>
              {city.nome} - {city.estado.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="select-container">
        <label htmlFor="type-select">Selecione um tipo de imóvel:</label>
        <select id="type-select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="custom-select">
          <option value="">-- Escolha um tipo --</option>
          {types.map((type) => (
            <option key={type.tipo_id} value={type.tipo_id}>
              {type.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="select-container">
        <label>Quartos:</label>
        <input type="number" value={selectedRooms} onChange={(e) => setSelectedRooms(e.target.value)} />
      </div>

      <div className="select-container">
        <label>Vagas:</label>
        <input type="number" value={selectedParking} onChange={(e) => setSelectedParking(e.target.value)} />
      </div>

      <div className="select-container">
        <label>Banheiros:</label>
        <input type="number" value={selectedBathrooms} onChange={(e) => setSelectedBathrooms(e.target.value)} />
      </div>

      <button onClick={handleFilter}>Buscar filtrado</button>
    </div>
  );
}

export default ImovelFilter;
