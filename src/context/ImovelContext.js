import { createContext, useContext, useState, useEffect } from "react";

const ImovelContext = createContext();

export const ImovelProvider = ({ children }) => {
  //const [imovelId, setImovelId] = useState(null);
  const [filtros, setFiltros] = useState({});



  return (
    <ImovelContext.Provider value={{ imovelId, setImovelId, filtros, setFiltros }}>
      {children}
    </ImovelContext.Provider>
  );
};

export const useImovel = () => {
  return useContext(ImovelContext);
};
