import React, { useState, useRef } from "react";
import axios from "axios";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";

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
  const [addingImages, setAddingImages] = useState(false);
  const morePhotosRef = useRef(null);

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
        tipo_id: parseInt(formData.tipo_id) || 2,
        estado_id: parseInt(formData.estado_id) || 2,
        cidade_id: parseInt(formData.cidade_id) || 2,
      };

      const response = await axios.post(
        "https://api-corretora-production.up.railway.app/imovel",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      const id = response.data.imovel.imovel_id;
      setImovelId(id);
      toast.success("Imóvel cadastrado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      await sendImage(id, formData.imagemBase64);
      setAddingImages(true);
    } catch (error) {
      console.error("Erro ao cadastrar imóvel:", error);

      const errorMessage =
        error.response?.data?.message || "Erro desconhecido ao criar imóvel!";

      toast.error(`Erro ao criar imóvel: ${errorMessage}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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

      toast.success("Imagem adicionada com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      toast.info(
        <div>
          Deseja adicionar mais uma imagem?
          <div style={{ marginTop: 10, display: "flex", gap: "10px" }}>
            <button
              onClick={() => {
                setAddingImages(true);
                setTimeout(() => {
                  morePhotosRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 100);
              }}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Sim
            </button>
            <button
              onClick={() => {
                setAddingImages(false);
                setImovelId(null);
                toast.dismiss();
              }}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Não
            </button>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          hideProgressBar: true,
        }
      );
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      toast.error("Erro ao enviar imagem!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <ToastContainer />
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
        <button
          className="button-register"
          type="submit"
          disabled={loading || addingImages}
        >
          {loading ? "Cadastrando..." : "Cadastrar Imóvel"}
        </button>
      </form>

      {imovelId && addingImages && (
        <div ref={morePhotosRef} className="container-add-more">
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
