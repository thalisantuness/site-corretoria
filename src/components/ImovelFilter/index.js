import React, {useState, useEffect} from  "react";
import "./styles.css";

function ImovelFilter() {

      const cities = [
        { cidade_id: 1, nome: "Alegrete", estado_id: 1, estado: { estado_id: 1, nome: "Rio Grande do Sul" } },
        { cidade_id: 2, nome: "Biguaçu", estado_id: 2, estado: { estado_id: 2, nome: "Santa Catarina" } }
      ];
    
      const [selectedCity, setSelectedCity] = useState("");
    
      const handleChange = (event) => {
        setSelectedCity(event.target.value);
      };

  return (
    <>
  
      <div className="section-filters">
      <h2>Filtros</h2>

     
      <div className="select-container">
      <label htmlFor="city-select">Selecione uma cidade:</label>
      <select id="city-select" value={selectedCity} onChange={handleChange} className="custom-select">
        <option value="">-- Escolha uma cidade --</option>
        {cities.map((city) => (
          <option key={city.cidade_id} value={city.cidade_id}>
            {city.nome} - {city.estado.nome}
          </option>
        ))}
      </select>
      {selectedCity && <p>Selecionado: {cities.find(city => city.cidade_id == selectedCity)?.nome}</p>}
    </div>


    <div className="select-container">
      <label htmlFor="city-select">Selecione um tipo de imóvel:</label>
      <select id="city-select" value={selectedCity} onChange={handleChange} className="custom-select">
        <option value="">-- Escolha um tipo --</option>
        {cities.map((city) => (
          <option key={city.cidade_id} value={city.cidade_id}>
            {city.nome} - {city.estado.nome}
          </option>
        ))}
      </select>
      {selectedCity && <p>Selecionado: {cities.find(city => city.cidade_id == selectedCity)?.nome}</p>}
    </div>


    <div className="select-container">
      <label htmlFor="city-select">Selecione um número de quartos:</label>
      <select id="city-select" value={selectedCity} onChange={handleChange} className="custom-select">
        <option value="">-- Escolha os quartos --</option>
        {cities.map((city) => (
          <option key={city.cidade_id} value={city.cidade_id}>
            {city.nome} - {city.estado.nome}
          </option>
        ))}
      </select>
      {selectedCity && <p>Selecionado: {cities.find(city => city.cidade_id == selectedCity)?.nome}</p>}
    </div>


    <div className="select-container">
      <label htmlFor="city-select">Selecione um número de vagas:</label>
      <select id="city-select" value={selectedCity} onChange={handleChange} className="custom-select">
        <option value="">-- Escolha as vagas --</option>
        {cities.map((city) => (
          <option key={city.cidade_id} value={city.cidade_id}>
            {city.nome} - {city.estado.nome}
          </option>
        ))}
      </select>
      {selectedCity && <p>Selecionado: {cities.find(city => city.cidade_id == selectedCity)?.nome}</p>}
    </div>


    <div className="select-container">
      <label htmlFor="city-select">Selecione um número de banheiros:</label>
      <select id="city-select" value={selectedCity} onChange={handleChange} className="custom-select">
        <option value="">-- Escolha os banheiros --</option>
        {cities.map((city) => (
          <option key={city.cidade_id} value={city.cidade_id}>
            {city.nome} - {city.estado.nome}
          </option>
        ))}
      </select>
      {selectedCity && <p>Selecionado: {cities.find(city => city.cidade_id == selectedCity)?.nome}</p>}
    </div>


    </div>
 
    </>
  );
}

export default ImovelFilter;
