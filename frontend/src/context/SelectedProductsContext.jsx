import { createContext, useState } from "react";

export const SelectedProductsContext = createContext();

export const SelectedProductsContextProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <SelectedProductsContext.Provider
      value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </SelectedProductsContext.Provider>
  );
};
