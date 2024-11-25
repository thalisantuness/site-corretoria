import React from "react";
import "./styles.css";
import add from "../../assets/mais.png";

function Blog() {
  return (
    <div className="app-container">
      <div className="left-container">
        <div className="lineP"></div>
        <p>
        Apartamentos
          <img
            src={add}
            alt="Add Button"
            ref={(el) =>
              el && el.scrollIntoView({ behavior: "smooth", block: "end" })
            }
          />
        </p>
        <div className="lineP"></div>
        <p>
       Casas
          <img
            src={add}
            alt="Add Button"
            ref={(el) =>
              el && el.scrollIntoView({ behavior: "smooth", block: "end" })
            }
          />
        </p>
        <div className="lineP"></div>
        <p>
        Sala Comercial
          <img
            src={add}
            alt="Add Button"
            ref={(el) =>
              el && el.scrollIntoView({ behavior: "smooth", block: "end" })
            }
          />
        </p>
        <div className="lineP"></div>
      </div>

      <div className="right-container">
        <h1>Veja Os Detalhes</h1>
        <p>
        Nessa seção você poderá ver a listagem completa de imóveis, filtrar, ver fotos e detalhes.
        </p>
      

        <a href="#">Confira &rarr;</a>
      </div>
    </div>
  );
}
export default Blog;
