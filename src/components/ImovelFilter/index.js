import React, { useState, useEffect } from "react";
import axios from "axios";
import { useImovel } from "../../context/ImovelContext";
import { FaSearch, FaChevronDown, FaTimes } from "react-icons/fa";
import "./styles.css";

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
        const response = await axios.get(
          "https://api-corretora-production.up.railway.app/cidades"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          "https://api-corretora-production.up.railway.app/tipos"
        );
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

  const handleClearFilters = () => {
    setSelectedCity("");
    setSelectedType("");
    setSelectedRooms("");
    setSelectedParking("");
    setSelectedBathrooms("");
    setFiltros({
      cidade_id: "",
      tipo_id: "",
      n_quartos: "",
      n_vagas: "",
      n_banheiros: "",
    });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <div className="select-wrapper">
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="filter-select"
          >
            <option value="">Cidade</option>
            {cities.map((city) => (
              <option key={city.cidade_id} value={city.cidade_id}>
                {city.nome} - {city.estado.nome}
              </option>
            ))}
          </select>
          <FaChevronDown className="select-icon" />
        </div>
      </div>

      <div className="filter-group">
        <div className="select-wrapper">
          <select
            id="type-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="">Tipo</option>
            {types.map((type) => (
              <option key={type.tipo_id} value={type.tipo_id}>
                {type.nome}
              </option>
            ))}
          </select>
          <FaChevronDown className="select-icon" />
        </div>
      </div>

      <div className="filter-group">
        <input
          id="number-rooms"
          placeholder="Quartos"
          type="number"
          min="0"
          value={selectedRooms}
          onChange={(e) => setSelectedRooms(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <input
          id="cars"
          placeholder="Vagas"
          type="number"
          min="0"
          value={selectedParking}
          onChange={(e) => setSelectedParking(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <input
          id="bathroom"
          placeholder="Banheiros"
          type="number"
          min="0"
          value={selectedBathrooms}
          onChange={(e) => setSelectedBathrooms(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-actions">
        <button onClick={handleFilter} className="filter-button">
          <FaSearch className="search-icon" />
          Filtrar
        </button>
        <button onClick={handleClearFilters} className="clear-button">
          <FaTimes className="clear-icon" />
          Limpar
        </button>
      </div>
    </div>
  );
}

export default ImovelFilter;