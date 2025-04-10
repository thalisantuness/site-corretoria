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
    <div>
         <ToastContainer />
      <h2 className="subtitle-login">Olá, faça seu login</h2>
      <form className="form-login" onSubmit={handleSubmit}>
        <input
          className="input-login"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          className="input-login"
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button className="button-login" type="submit" disabled={loading}>
          {loading ? "Logando..." : "Login"}
        </button>
      </form>
    </div>
  );
}
