import { createContext, useContext, useState } from "react";

const ImovelContext = createContext();

export const ImovelProvider = ({ children }) => {
  //const [imovelId, setImovelId] = useState(null);
  const [filtros, setFiltros] = useState({});



  return (
    <ImovelContext.Provider value={{ filtros, setFiltros }}>
      {children}
    </ImovelContext.Provider>
  );
};

export const useImovel = () => {
  return useContext(ImovelContext);
};
