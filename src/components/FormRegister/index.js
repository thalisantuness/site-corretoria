import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FaTrash, FaPlus, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';
import './styles.css';

function FormRegister() {
  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    description: '',
    valor: '',
    valor_condominio: '',
    valor_iptu: '',
    tipo_transacao: 'Aluguel',
    n_quartos: '',
    n_banheiros: '',
    n_vagas: '',
    tipo_id: '',
    estado_id: '',
    cidade_id: '',
    imagemBase64: ''
  });

  // Estados do componente
  const [loading, setLoading] = useState(false);
  const [imovelId, setImovelId] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [deletingPhoto, setDeletingPhoto] = useState(null);
  const fileInputRef = useRef(null);

  // Carrega dados iniciais
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tiposRes, estadosRes, cidadesRes] = await Promise.all([
          axios.get('https://api-corretora-production.up.railway.app/tipos'),
          axios.get('https://api-corretora-production.up.railway.app/estados'),
          axios.get('https://api-corretora-production.up.railway.app/cidades'),
        ]);
        setTipos(tiposRes.data);
        setEstados(estadosRes.data);
        setCidades(cidadesRes.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar tipos, estados ou cidades!', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
      }
    };
    fetchData();
  }, []);

  // Filtra cidades baseado no estado selecionado
  const filteredCidades = cidades.filter(
    (cidade) => cidade.estado_id === parseInt(formData.estado_id)
  );

  // Manipuladores de eventos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imagemBase64: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para buscar fotos do imóvel
  const fetchPhotos = async () => {
    if (!imovelId) return;
    
    try {
      const response = await axios.get(
        `https://api-corretora-production.up.railway.app/imovel/${imovelId}`
      );
      setPhotos(response.data.photos || []);
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Se já tem imovelId, não faz nada (não permite atualizar/criar novo)
    if (imovelId) return;
    
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
        'https://api-corretora-production.up.railway.app/imovel',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const id = response.data.imovel.imovel_id;
      setImovelId(id);
      
      // Envia a imagem principal
      if (formData.imagemBase64) {
        await sendImage(id, formData.imagemBase64);
        // Busca as fotos após cadastrar
        await fetchPhotos();
      }
      
      toast.success('Imóvel cadastrado com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      console.error('Erro ao cadastrar imóvel:', error);
      const errorMessage =
        error.response?.data?.message || 'Erro desconhecido ao criar imóvel!';
      toast.error(`Erro ao criar imóvel: ${errorMessage}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
    setLoading(false);
  };

  const sendImage = async (id, image) => {
    if (!image) return;
    
    try {
      await axios.post(
        'https://api-corretora-production.up.railway.app/photo',
        { imovel_id: id, imagemBase64: image },
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      throw error;
    }
  };

  const addPhoto = async () => {
    if (!newPhoto || !imovelId) return;
    
    setUploadingPhoto(true);
    try {
      await sendImage(imovelId, newPhoto);
      setNewPhoto(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      await fetchPhotos(); // Atualiza a lista de fotos após adicionar
      toast.success('Foto adicionada com sucesso!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      });
    } catch (error) {
      toast.error('Erro ao adicionar foto!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    }
    setUploadingPhoto(false);
  };

  const removePhoto = async (photoId) => {
    // Impede a remoção da primeira imagem (imagem principal)
    if (photos.length > 0 && photos[0].photo_id === photoId) {
      toast.error('Não é possível remover a imagem principal!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      return;
    }

    setDeletingPhoto(photoId);
    try {
      await axios.delete(
        `https://api-corretora-production.up.railway.app/photo/${photoId}`,
        { data: { imovel_id: imovelId } }
      );
      await fetchPhotos(); // Atualiza a lista de fotos após remover
      toast.success('Foto removida com sucesso!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      });
    } catch (error) {
      console.error('Erro ao remover foto:', error);
      toast.error('Erro ao remover foto!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    }
    setDeletingPhoto(null);
  };

  // Renderização
  return (
    <div className="property-form-container">
      <ToastContainer />
      <h2>{imovelId ? 'Adicionar Fotos ao Imóvel' : 'Cadastrar Imóvel'}</h2>
      
      {!imovelId ? (
        <form className="form-register" onSubmit={handleSubmit}>
          {/* Seção de informações básicas */}
          <div className="form-section">
            <h3>Informações Básicas</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Nome do Imóvel</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Ex: Apartamento Centro"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="description"
                  placeholder="Descreva o imóvel..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>
          
          {/* Seção de valores */}
          <div className="form-section">
            <h3>Valores</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Valor {formData.tipo_transacao === 'Aluguel' ? 'do Aluguel' : 'de Venda'}</label>
                <input
                  type="number"
                  name="valor"
                  placeholder="R$ 0,00"
                  value={formData.valor}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label>Valor do Condomínio</label>
                <input
                  type="number"
                  name="valor_condominio"
                  placeholder="R$ 0,00"
                  value={formData.valor_condominio}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label>Valor do IPTU</label>
                <input
                  type="number"
                  name="valor_iptu"
                  placeholder="R$ 0,00"
                  value={formData.valor_iptu}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label>Tipo de Transação</label>
                <select
                  name="tipo_transacao"
                  value={formData.tipo_transacao}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="Aluguel">Aluguel</option>
                  <option value="Venda">Venda</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Seção de características */}
          <div className="form-section">
            <h3>Características</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Quartos</label>
                <input
                  type="number"
                  name="n_quartos"
                  placeholder="0"
                  value={formData.n_quartos}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label>Banheiros</label>
                <input
                  type="number"
                  name="n_banheiros"
                  placeholder="0"
                  value={formData.n_banheiros}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label>Vagas</label>
                <input
                  type="number"
                  name="n_vagas"
                  placeholder="0"
                  value={formData.n_vagas}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>
          
          {/* Seção de localização */}
          <div className="form-section">
            <h3>Localização</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Tipo de Imóvel</label>
                <select
                  name="tipo_id"
                  value={formData.tipo_id}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="">Selecione...</option>
                  {tipos.map((tipo) => (
                    <option key={tipo.tipo_id} value={tipo.tipo_id}>
                      {tipo.nome}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Estado</label>
                <select
                  name="estado_id"
                  value={formData.estado_id}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="">Selecione...</option>
                  {estados.map((estado) => (
                    <option key={estado.estado_id} value={estado.estado_id}>
                      {estado.nome}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Cidade</label>
                <select
                  name="cidade_id"
                  value={formData.cidade_id}
                  onChange={handleChange}
                  required
                  disabled={loading || !formData.estado_id}
                >
                  <option value="">Selecione...</option>
                  {filteredCidades.map((cidade) => (
                    <option key={cidade.cidade_id} value={cidade.cidade_id}>
                      {cidade.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Seção de imagem principal */}
          <div className="form-section">
            <h3>Imagem Principal</h3>
            <div className="form-group">
              <label className="file-upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                  disabled={loading}
                />
                <span className="file-upload-button">
                  {formData.imagemBase64 ? 'Alterar Imagem' : 'Selecionar Imagem'}
                </span>
                {formData.imagemBase64 && (
                  <span className="file-upload-status">
                    <FaCheck className="success-icon" /> Imagem selecionada
                  </span>
                )}
              </label>
              {formData.imagemBase64 && (
                <div className="image-preview">
                  <img src={formData.imagemBase64} alt="Preview" />
                </div>
              )}
            </div>
          </div>
          
          {/* Botão de submit */}
          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner" /> Salvando...
                </>
              ) : (
                'Cadastrar Imóvel'
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="photos-section">
          <div className="success-message">
            <FaCheck className="success-icon" />
            <h3>Imóvel cadastrado com sucesso! ID: {imovelId}</h3>
            <p>Agora você pode adicionar mais fotos ao imóvel.</p>
          </div>
          
          <h3>Fotos do Imóvel</h3>
          
          {photos.length > 0 ? (
            <div className="photos-grid">
              {photos.map((photo, index) => (
                <div key={photo.photo_id} className="photo-item">
                  <img src={photo.imageData} alt={`Imóvel ${photo.photo_id}`} />
                  {index === 0 ? (
                    <button
                      className="delete-photo disabled"
                      disabled
                      title="Imagem principal não pode ser removida"
                    >
                      <FaTimes />
                    </button>
                  ) : (
                    <button
                      onClick={() => removePhoto(photo.photo_id)}
                      disabled={deletingPhoto === photo.photo_id}
                      className="delete-photo"
                      title="Remover foto"
                    >
                      {deletingPhoto === photo.photo_id ? (
                        <FaSpinner className="spinner" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-photos">Nenhuma foto adicional cadastrada ainda.</p>
          )}
          
          <div className="add-photo-container">
            <h4>Adicionar Nova Foto</h4>
            <div className="add-photo-form">
              <label className="file-upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleNewPhotoUpload}
                  ref={fileInputRef}
                  disabled={uploadingPhoto}
                />
                <span className="file-upload-button">
                  <FaPlus /> Selecionar Foto
                </span>
              </label>
              
              {newPhoto && (
                <>
                  <div className="image-preview">
                    <img src={newPhoto} alt="Nova foto" />
                  </div>
                  <button
                    onClick={addPhoto}
                    disabled={uploadingPhoto}
                    className="add-photo-button"
                  >
                    {uploadingPhoto ? (
                      <>
                        <FaSpinner className="spinner" /> Enviando...
                      </>
                    ) : (
                      'Adicionar Foto'
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormRegister;