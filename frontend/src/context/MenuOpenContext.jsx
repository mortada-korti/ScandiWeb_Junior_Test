import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";

export const MenuOpenContext = createContext();

export const MenuOpenContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <MenuOpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuOpenContext.Provider>
  );
};
