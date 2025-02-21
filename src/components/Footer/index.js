import React from "react";
import "./styles.css";
import Logo from "../../assets/logo-transparente.png"
import { Link } from "react-router-dom";


function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-left">
          <img src={Logo} alt="Logipsum" className="footer-logo" />
      
        </div>

        <div className="footer-right">
          <div className="footer-center">
            <ul className="footer-links">
              <li>
                <Link to="/imovel-list">Imóveis</Link>
              </li>
              <li>
                <a href="https://wa.me/5581992200646?text=Ol%C3%A1%2C%20gostei%20de%20um%20im%C3%B3vel%20que%20vi%20no%20seu%20site!">Contato</a>
              </li>
              {/* <li>
                <a href="#">Sobre Nós</a>
              </li> */}
            </ul>
          </div>
          {/* <div className="footer-center">
            <ul className="footer-links">
              <li>
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div> */}
          {/* <div className="footer-center">
            <ul className="footer-links">
              <li>
                <a href="#">WhatsApp</a>
              </li>
            </ul>
          </div> */}
        </div>
      </footer>

      <footer className="footerEnd">
        <div className="footer-content">
          <p>Cardial I.T © 2025 - Todos os direitos reservados</p>
        </div>
        {/* <div className="footerEnd-links">
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </div> */}
      </footer>
    </>
  );
}

export default Footer;
