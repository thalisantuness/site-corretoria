import React from "react";
import "./styles.css";
import Logo from "../../assets/logo-transparente.png"


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
                <a href="#">Imóveis</a>
              </li>
              <li>
                <a href="#">Contato</a>
              </li>
              {/* <li>
                <a href="#">Sobre Nós</a>
              </li> */}
            </ul>
          </div>
          <div className="footer-center">
            <ul className="footer-links">
              <li>
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>
          <div className="footer-center">
            <ul className="footer-links">
              <li>
                <a href="#">WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <footer className="footerEnd">
        <div className="footer-content">
          <p>© 2025 - Todos os direitos reservados</p>
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
