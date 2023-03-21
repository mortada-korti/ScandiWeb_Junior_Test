import { Outlet } from "react-router-dom";

// Context
import { MenuOpenContextProvider } from "../context/MenuOpenContext";

// Components
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";


const Root = () => {
  return (
    <MenuOpenContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </MenuOpenContextProvider>
  );
};

export default Root;
