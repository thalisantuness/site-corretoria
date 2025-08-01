import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FaTrash, FaPlus, FaSpinner, FaCheck, FaTimes, FaSave } from 'react-icons/fa';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import './styles.css';

function EditImovel() {
  const { id } = useParams();
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

  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [deletingPhoto, setDeletingPhoto] = useState(null);
  const fileInputRef = useRef(null);

  // Carrega dados iniciais
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tiposRes, estadosRes, cidadesRes, imovelRes] = await Promise.all([
          axios.get('https://api-corretora-production.up.railway.app/tipos'),
          axios.get('https://api-corretora-production.up.railway.app/estados'),
          axios.get('https://api-corretora-production.up.railway.app/cidades'),
          axios.get(`https://api-corretora-production.up.railway.app/imovel/${id}`)
        ]);

        setTipos(tiposRes.data);
        setEstados(estadosRes.data);
        setCidades(cidadesRes.data);

        // Preenche os dados do imóvel
        const imovelData = imovelRes.data;
        setFormData({
          nome: imovelData.nome || '',
          description: imovelData.description || '',
          valor: imovelData.valor || '',
          valor_condominio: imovelData.valor_condominio || '',
          valor_iptu: imovelData.valor_iptu || '',
          tipo_transacao: imovelData.tipo_transacao || 'Aluguel',
          n_quartos: imovelData.n_quartos || '',
          n_banheiros: imovelData.n_banheiros || '',
          n_vagas: imovelData.n_vagas || '',
          tipo_id: imovelData.tipo_id || '',
          estado_id: imovelData.estado_id || '',
          cidade_id: imovelData.cidade_id || '',
          imagemBase64: imovelData.photos?.[0]?.imageData || ''
        });

        setPhotos(imovelData.photos || []);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar dados do imóvel!', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
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

      await axios.put(
        `https://api-corretora-production.up.railway.app/imovel/${id}`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Se a imagem principal foi alterada, atualiza
      if (formData.imagemBase64 && !formData.imagemBase64.startsWith('http')) {
        await sendImage(id, formData.imagemBase64, true);
      }

      toast.success('Imóvel atualizado com sucesso!', {
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
      console.error('Erro ao atualizar imóvel:', error);
      toast.error('Erro ao atualizar imóvel!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    }
    setUpdating(false);
  };

  const sendImage = async (id, image, isMain = false) => {
    if (!image) return;
    
    try {
      await axios.post(
        'https://api-corretora-production.up.railway.app/photo',
        { 
          imovel_id: id, 
          imagemBase64: image,
          is_main: isMain 
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      // Recarrega as fotos após enviar
      const response = await axios.get(`https://api-corretora-production.up.railway.app/imovel/${id}`);
      setPhotos(response.data.photos || []);
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      throw error;
    }
  };

  const addPhoto = async () => {
    if (!newPhoto) return;
    
    setUploadingPhoto(true);
    try {
      await sendImage(id, newPhoto);
      setNewPhoto(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
        { data: { imovel_id: id } }
      );
      // Atualiza a lista de fotos após remover
      const response = await axios.get(`https://api-corretora-production.up.railway.app/imovel/${id}`);
      setPhotos(response.data.photos || []);
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

  if (loading) {
    return (
      <div className="container">
        <NavBar />
        <div className="loading-container">
          <FaSpinner className="spinner" /> Carregando dados do imóvel...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container">
      <NavBar />
      <div className="property-form-container">
        <ToastContainer />
        <h2>Editar Imóvel ID: {id}</h2>
        
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
                  disabled={updating}
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
                  disabled={updating}
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
                  disabled={updating}
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
                  disabled={updating}
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
                  disabled={updating}
                />
              </div>
              
              <div className="form-group">
                <label>Tipo de Transação</label>
                <select
                  name="tipo_transacao"
                  value={formData.tipo_transacao}
                  onChange={handleChange}
                  required
                  disabled={updating}
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
                  disabled={updating}
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
                  disabled={updating}
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
                  disabled={updating}
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
                  disabled={updating}
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
                  disabled={updating}
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
                  disabled={updating || !formData.estado_id}
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
                  disabled={updating}
                />
                {/* <span className="file-upload-button">
                  {formData.imagemBase64 ? 'Alterar Imagem' : 'Selecionar Imagem'}
                </span> */}
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
              disabled={updating}
            >
              {updating ? (
                <>
                  <FaSpinner className="spinner" /> Salvando...
                </>
              ) : (
                <>
                  <FaSave /> Salvar Alterações
                </>
              )}
            </button>
          </div>
        </form>
        
        {/* Seção de fotos adicionais */}
        <div className="photos-section">
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
                  disabled={uploadingPhoto || updating}
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
                    disabled={uploadingPhoto || updating}
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
      </div>
      <Footer />
    </div>
  );
}

export default EditImovel;