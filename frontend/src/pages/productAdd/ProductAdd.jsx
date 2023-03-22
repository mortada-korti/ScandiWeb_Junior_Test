import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios/makeRequest";

// Components
import DVDTypeDetails from "../../components/productType/DVDTypeDetails";
import BookTypeDetails from "../../components/productType/BookTypeDetails";
import FurnitureTypeDetails from "../../components/productType/FurnitureTypeDetails";

// @mui
import { FormGroup, FormHelperText, NativeSelect, Stack } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

// Style
import "./productAdd.scss";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [productType, setProductType] = useState("");
  const [errors, setErrors] = useState({});
  const [desc, setDesc] = useState("");
  const [inputs, setInputs] = useState({
    sku: null,
    name: null,
    price: null,
    productType: null,
    attributes: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleProductType = (e) => {
    setProductType(e.target.value);

    setInputs((prev) => {
      let attributes;
      switch (e.target.value) {
        case "DVD":
          attributes = { size: null };
          break;
        case "Book":
          attributes = { weight: null };
          break;
        case "Furniture":
          attributes = { height: null, width: null, length: null };
          break;
        default:
          attributes = null;
          break;
      }
      return {
        ...prev,
        productType: e.target.value,
        attributes: attributes,
      };
    });
  };

  const handleAttributes = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => {
      let attributes = prev.attributes;
      attributes = { ...attributes, [name]: parseFloat(value) };
      return { ...prev, attributes };
    });
  };

  const types = {
    DVD: (
      <DVDTypeDetails
        error={errors.size}
        handleChange={handleAttributes}
        setDesc={setDesc}
      />
    ),
    Book: (
      <BookTypeDetails
        error={errors.weight}
        handleChange={handleAttributes}
        setDesc={setDesc}
      />
    ),
    Furniture: (
      <FurnitureTypeDetails
        errors={[errors.height, errors.width, errors.length]}
        handleChange={handleAttributes}
        setDesc={setDesc}
      />
    ),
  };

  useEffect(() => {
    if (isSubmit && !errors) {
      navigate("/");
    }
  }, [isSubmit, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    makeRequest
      .post("/products/add", inputs)
      .then((res) => {
        setErrors(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Stack
      component='form'
      id='product_form'
      className='productAdd'
      onSubmit={handleSubmit}
      sx={{ backgroundColor: "background.paper", color: "text.primary" }}>
      <FormControl
        sx={{ mb: 2, width: { sm: "300px", xs: "100%" } }}
        required
        variant='outlined'
        onChange={handleChange}
        error={errors.sku !== undefined}>
        <InputLabel>SKU</InputLabel>
        <OutlinedInput type='text' label='SKU' name='sku' id='sku' />
        <FormHelperText>{errors.sku}</FormHelperText>
      </FormControl>

      <FormControl
        sx={{ mb: 2, width: { sm: "300px", xs: "100%" } }}
        required
        variant='outlined'
        onChange={handleChange}
        error={errors.name !== undefined}>
        <InputLabel>Name</InputLabel>
        <OutlinedInput type='text' label='Name' name='name' id='name' />
        <FormHelperText>{errors.name}</FormHelperText>
      </FormControl>

      <FormControl
        sx={{ mb: 2, width: { sm: "300px", xs: "100%" } }}
        required
        variant='outlined'
        onChange={handleChange}
        error={errors.price !== undefined}>
        <InputLabel>Price</InputLabel>
        <OutlinedInput
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          type='number'
          label='Price'
          name='price'
          id='price'
          inputProps={{ min: 0.01, step: 0.01 }}
        />
        <FormHelperText>{errors.price}</FormHelperText>
      </FormControl>

      <FormControl
        sx={{ mb: 2, width: { sm: "300px", xs: "100%" } }}
        htmlFor='productType'
        error={errors.productType !== undefined}>
        <NativeSelect
          value={productType}
          required
          label='Type Switcher'
          name='productType'
          id='productType'
          onChange={(e) => handleProductType(e)}>
          <option disabled value=''>
            Type Switcher
          </option>
          <option value='DVD'>DVD</option>
          <option value='Book'>Book</option>
          <option value='Furniture'>Furniture</option>
        </NativeSelect>
        <FormHelperText>{errors.productType}</FormHelperText>
      </FormControl>

      <FormGroup sx={{ mb: 2, width: { sm: "300px", xs: "100%" } }}>
        {types[productType]}
        <FormHelperText>{desc}</FormHelperText>
      </FormGroup>
    </Stack>
  );
};

export default ProductAdd;
