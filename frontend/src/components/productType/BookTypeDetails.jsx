import { useEffect } from "react";

// @mui
import {
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const BookTypeDetails = ({ handleChange, setDesc, error }) => {
  useEffect(() => {
    setDesc("Please, provide weight in (KG)");
  }, []);

  return (
    <>
      <InputLabel error={error !== undefined}>Weight</InputLabel>
      <OutlinedInput
        startAdornment={<InputAdornment position='start'>KG</InputAdornment>}
        error={error !== undefined}
        label='Weight'
        type='number'
        name='weight'
        id='weight'
        inputProps={{ min: 0.01, step: 0.0001 }}
        onChange={handleChange}
        required
      />
      <FormHelperText error={error !== undefined}>{error}</FormHelperText>
    </>
  );
};

export default BookTypeDetails;
