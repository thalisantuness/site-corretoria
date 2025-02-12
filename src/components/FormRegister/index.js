import React, { useState } from "react";
import axios from "axios";

function FormRegister() {
  const [formData, setFormData] = useState({
    nome: "",
    description: "",
    valor: "",
    valor_condominio: "",
    n_quartos: "",
    n_banheiros: "",
    n_vagas: "",
    tipo_id: "",
    estado_id: "",
    cidade_id: "",
    imagemBase64: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, imagemBase64: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        valor: parseFloat(formData.valor) || 0,
        valor_condominio: parseFloat(formData.valor_condominio) || 0,
        n_quartos: parseInt(formData.n_quartos) || 0,
        n_banheiros: parseInt(formData.n_banheiros) || 0,
        n_vagas: parseInt(formData.n_vagas) || 0,
        tipo_id: parseInt(formData.tipo_id) || 1,
        estado_id: parseInt(formData.estado_id) || 1,
        cidade_id: parseInt(formData.cidade_id) || 1,
      };

      const response = await axios.post(
        "https://api-corretora-production.up.railway.app/imovel",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Imóvel cadastrado com sucesso!");
      console.log("Resposta:", response.data);
    } catch (error) {
      console.error("Erro ao cadastrar imóvel:", error);
      alert("Erro ao cadastrar imóvel!");
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar Imóvel</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
        <textarea name="description" placeholder="Descrição" value={formData.description} onChange={handleChange} required />
        <input type="number" name="valor" placeholder="Valor" value={formData.valor} onChange={handleChange} required />
        <input type="number" name="valor_condominio" placeholder="Valor do condomínio" value={formData.valor_condominio} onChange={handleChange} required />
        <input type="number" name="n_quartos" placeholder="N° Quartos" value={formData.n_quartos} onChange={handleChange} required />
        <input type="number" name="n_banheiros" placeholder="N° Banheiros" value={formData.n_banheiros} onChange={handleChange} required />
        <input type="number" name="n_vagas" placeholder="N° Vagas" value={formData.n_vagas} onChange={handleChange} required />
        <input type="number" name="tipo_id" placeholder="Tipo ID" value={formData.tipo_id} onChange={handleChange} required />
        <input type="number" name="estado_id" placeholder="Estado ID" value={formData.estado_id} onChange={handleChange} required />
        <input type="number" name="cidade_id" placeholder="Cidade ID" value={formData.cidade_id} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageUpload} required />
        <button type="submit">Cadastrar Imóvel</button>
      </form>
    </div>
  );
}

export default FormRegister;
