import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";

function FormRegister() {
  const [formData, setFormData] = useState({
    nome: "",
    description: "",
    valor: "",
    valor_condominio: "",
    valor_iptu: "",
    tipo_transacao: "Aluguel",
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
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const morePhotosRef = useRef(null);

  // Fetch data for tipos, estados, and cidades on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tiposRes, estadosRes, cidadesRes] = await Promise.all([
          axios.get("https://api-corretora-production.up.railway.app/tipos"),
          axios.get("https://api-corretora-production.up.railway.app/estados"),
          axios.get("https://api-corretora-production.up.railway.app/cidades"),
        ]);
        setTipos(tiposRes.data);
        setEstados(estadosRes.data);
        setCidades(cidadesRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar tipos, estados ou cidades!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    };
    fetchData();
  }, []);

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
        valor_iptu: parseFloat(formData.valor_iptu) || 0,
        n_quartos: parseInt(formData.n_quartos) || 0,
        n_banheiros: parseInt(formData.n_banheiros) || 0,
        n_vagas: parseInt(formData.n_vagas) || 0,
        tipo_id: parseInt(formData.tipo_id) || 1,
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

  // Filter cities based on selected state
  const filteredCidades = cidades.filter(
    (cidade) => cidade.estado_id === parseInt(formData.estado_id)
  );

  return (
    <div className="property-form-container">
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
          name="valor_iptu"
          placeholder="Valor do IPTU"
          value={formData.valor_iptu}
          onChange={handleChange}
          required
          disabled={loading || addingImages}
        />
        <select
          className="input-register"
          name="tipo_transacao"
          value={formData.tipo_transacao}
          onChange={handleChange}
          required
          disabled={loading || addingImages}
        >
          <option value="" disabled>
            Selecione o tipo de transação
          </option>
          <option value="Aluguel">Aluguel</option>
          <option value="Venda">Venda</option>
        </select>
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
        <select
          className="input-register"
          name="tipo_id"
          value={formData.tipo_id}
          onChange={handleChange}
          required
          disabled={loading || addingImages}
        >
          <option value="" disabled>
            Selecione o tipo de imóvel
          </option>
          {tipos.map((tipo) => (
            <option key={tipo.tipo_id} value={tipo.tipo_id}>
              {tipo.nome}
            </option>
          ))}
        </select>
        <select
          className="input-register"
          name="estado_id"
          value={formData.estado_id}
          onChange={handleChange}
          required
          disabled={loading || addingImages}
        >
          <option value="" disabled>
            Selecione o estado
          </option>
          {estados.map((estado) => (
            <option key={estado.estado_id} value={estado.estado_id}>
              {estado.nome}
            </option>
          ))}
        </select>
        <select
          className="input-register"
          name="cidade_id"
          value={formData.cidade_id}
          onChange={handleChange}
          required
          disabled={loading || addingImages || !formData.estado_id}
        >
          <option value="" disabled>
            Selecione a cidade
          </option>
          {filteredCidades.map((cidade) => (
            <option key={cidade.cidade_id} value={cidade.cidade_id}>
              {cidade.nome}
            </option>
          ))}
        </select>
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