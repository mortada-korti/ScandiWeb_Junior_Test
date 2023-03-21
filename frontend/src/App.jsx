import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Context
import { useContext } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import { SelectedProductsContextProvider } from "./context/SelectedProductsContext";

// @mui
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { MainTheme } from "./components/theme/MainTheme";

// Pages
import ProductAdd from "./pages/productAdd/ProductAdd";
import ProductList from "./pages/productList/ProductList";
import NotFound from "./pages/404/NotFound";

// Layout
import Root from "./layout/Root";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const theme = createTheme(MainTheme(darkMode));

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='*' element={<Root />}>
        <Route index element={<ProductList />} />
        <Route path='add-product' element={<ProductAdd />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <SelectedProductsContextProvider>
        <div className='App'>
          <RouterProvider router={router} />
        </div>
      </SelectedProductsContextProvider>
    </ThemeProvider>
  );
}

export default App;
