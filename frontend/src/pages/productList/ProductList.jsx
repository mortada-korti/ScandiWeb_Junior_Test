import { makeRequest } from "../../axios/makeRequest";

// Context
import { useEffect, useState, useContext, forwardRef } from "react";
import { SelectedProductsContext } from "../../context/SelectedProductsContext";
import { MenuOpenContext } from "../../context/MenuOpenContext";

// @mui
import { Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Component
import Item from "../../components/item/Item";

// Style
import "./productList.scss";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setIsOpen } = useContext(MenuOpenContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const { selectedProducts, setSelectedProducts } = useContext(
    SelectedProductsContext
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("/products");
      setData(res.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setSelectedProducts((prev) =>
      e.target.checked
        ? [...prev, parseInt(e.target.value)]
        : prev.filter((item) => item !== parseInt(e.target.value))
    );
  };

  useEffect(() => {
    fetchData();
    setIsSubmit(false);
  }, [isSubmit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProducts.length > 0) {
      setIsSubmit(true);
      makeRequest.post("/products/delete", selectedProducts);
      setSelectedProducts([]);
      setIsOpen(false);
    } else {
      setOpenAlert(true);
    }
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  return (
    <Stack
      component='form'
      id='product_form'
      className='productList'
      bgcolor='background.paper'
      color='text.primary'
      direction='row'
      onSubmit={handleSubmit}>
      {error
        ? "something went wrong..."
        : loading
        ? Array.from(new Array(12)).map((item, index) => (
            <Skeleton
              key={index}
              variant='rectangular'
              width={300}
              height={200}
              sx={{ borderRadius: "0.5rem" }}
            />
          ))
        : data?.map((item) => (
            <Item key={item.id} item={item} handleChange={handleChange} />
          ))}

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}>
        <Alert
          onClose={() => setOpenAlert(false)}
          severity='warning'
          sx={{ width: "100%" }}>
          Please, select an item in order to delete it !
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ProductList;
