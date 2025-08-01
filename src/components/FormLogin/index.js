import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { ToastContainer, toast } from 'react-toastify';

export default function FormLogin() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api-corretora-production.up.railway.app/usuarios/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      ); 
      
      const token = response.data.token;
      if (token) {
          toast.success("Login realizado com sucesso!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
        localStorage.setItem("token", token); 
        window.location.href = "/imovel-list-admin"; 
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
        
      
      const errorMessage = error.response?.data?.message || "Erro desconhecido ao logar!";

      toast.error(`Erro ao logar: ${errorMessage}`, {
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

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-card">
        <h2 className="login-title">Acesso Administrativo</h2>
        <p className="login-subtitle">Insira suas credenciais para acessar o painel</p>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              id="email"
              className="login-input"
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="senha" className="input-label">Senha</label>
            <input
              id="senha"
              className="login-input"
              type="password"
              name="senha"
              placeholder="••••••••"
              value={formData.senha}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? (
              <span className="button-loader"></span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}