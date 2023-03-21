// Context
import { useContext } from "react";
import { SelectedProductsContext } from "../../context/SelectedProductsContext";

// @mui
import styled from "@emotion/styled";
import { Checkbox, Stack } from "@mui/material";

// Style
import "./item.scss";

const Item = ({ item, handleChange }) => {
  const { selectedProducts } = useContext(SelectedProductsContext);

  return (
    <Card
      className='item'
      sx={{
        border: "2px solid",
        borderColor: selectedProducts.includes(parseInt(item.id))
          ? "error.main"
          : "transparent",
      }}>
      <Checkbox
        color='error'
        name={`product-${item.id}`}
        value={item.id}
        className='delete-checkbox'
        onChange={handleChange}
      />
      <div className='item--sku'>{item.sku}</div>
      <div className='item--name'>{item.name}</div>
      <div className='item--price'>{parseFloat(item.price).toFixed(2)}$</div>
      <div className='item--desc'>{item.desc}</div>
    </Card>
  );
};

export default Item;

const Card = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));
