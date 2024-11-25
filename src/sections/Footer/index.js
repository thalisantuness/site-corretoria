import React from "react";
import "./styles.css";
import LogoIpsun from "../../assets/logoipsum.png";
import Insta from "../../assets/instagram1.svg";
import Twitter from "../../assets/twitter.svg";
import Facebook from "../../assets/facebook.svg";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-left">
          <img src={LogoIpsun} alt="Logipsum" className="footer-logo" />
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-instagram">
                <img src={Insta} alt="Instagram" />
              </i>
            </a>
            <a href="#">
              <i className="fab fa-twitter">
                <img src={Twitter} alt="Twitter" />
              </i>
            </a>
            <a href="#">
              <i className="fab fa-facebook">
                <img src={Facebook} alt="Facebook" />
              </i>
            </a>
          </div>
          <button className="contact-button">Contact Us</button>
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
              <li>
                <a href="#">Sobre Nós</a>
              </li>
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
          <p>© 2021 - All Rights Reserved</p>
        </div>
        <div className="footerEnd-links">
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
