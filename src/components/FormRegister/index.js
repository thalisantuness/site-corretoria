import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

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

  const [loading, setLoading] = useState(false);
  const [imovelId, setImovelId] = useState(null);
  const [additionalImage, setAdditionalImage] = useState("");
  const [addingImages, setAddingImages] = useState(false); // Controla o estado de adicionar imagens

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e, setImageFunction) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImageFunction(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

      const id = response.data.imovel.imovel_id;
      setImovelId(id);
      alert("Imóvel cadastrado com sucesso!");
      await sendImage(id, formData.imagemBase64);
      setAddingImages(true); // Habilita o estado de adicionar imagens
    } catch (error) {
      console.error("Erro ao cadastrar imóvel:", error);
      alert("Erro ao cadastrar imóvel!");
    }
    setLoading(false);
  };

  const sendImage = async (id, image) => {
    setLoading(true);
    try {
      await axios.post(
        "https://api-corretora-production.up.railway.app/photo",
        { imovel_id: id, imagemBase64: image },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Imagem adicionada com sucesso!");

      const addMore = window.confirm("Deseja adicionar mais uma imagem?");
      if (!addMore) {
        setAddingImages(false); // Se não quiser mais imagens, habilita o formulário
        setImovelId(null);
      }
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      alert("Erro ao enviar imagem!");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Cadastrar Imóvel</h2>
      <form className="form-register" onSubmit={handleSubmit}>
        <input
          className="input-register"
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
          disabled={loading || addingImages}
        />
        <textarea
          className="text-area-register"
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          required
          disabled={loading || addingImages}
        />
        <input
          className="input-register"
          type="number"
          name="valor"
          placeholder="Valor"
          value={formData.valor}
          onChange={handleChange}
          required
          disabled={loading || addingImages}
        />
        <input
          className="input-register"
          type="number"
          name="valor_condominio"
          placeholder="Valor do condomínio"
          value={formData.valor_condominio}
          onChange={handleChange}
          required
          disabled={loading || addingImages}
        />
        <input
          className="input-register"
          type="number"
          name="n_quartos"
          placeholder="N° Quartos"
          value={formData.n_quartos}
          onChange={handleChange}
          required
          disabled={loading || addingImages}
        />
        <input
          className="input-register"
          type="number"
          name="n_banheiros"
          placeholder="N° Banheiros"
          value={formData.n_banheiros}
          onChange={handleChange}
          required
          disabled={loading || addingImages}
        />
        <input
          className="input-register"
          type="number"
          name="n_vagas"
          placeholder="N° Vagas"
          value={formData.n_vagas}
          onChange={handleChange}
          required
          disabled={loading || addingImages}
        />
        <input
          className="input-register"
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleImageUpload(e, (img) =>
              setFormData({ ...formData, imagemBase64: img })
            )
          }
          required
          disabled={loading || addingImages}
        />
        <button  className="button-register" type="submit" disabled={loading || addingImages}>
          {loading ? "Cadastrando..." : "Cadastrar Imóvel"}
        </button>
      </form>

      {imovelId && addingImages && (
        <div>
          <h3>Adicionar mais uma foto</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setAdditionalImage)}
            disabled={loading}
          />
          <button
            onClick={() => sendImage(imovelId, additionalImage)}
            disabled={!additionalImage || loading}
            className="button-register"
          >
            Submeter Imagem
          </button>
        </div>
      )}
    </div>
  );
}

export default FormRegister;
