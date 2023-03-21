import { useEffect } from "react";

// @mui
import {
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const DVDTypeDetails = ({ handleChange, setDesc, error }) => {
  useEffect(() => {
    setDesc("Please, provide size in (MB)");
  }, []);

  return (
    <>
      <InputLabel error={error !== undefined}>Size</InputLabel>
      <OutlinedInput
        startAdornment={<InputAdornment position='start'>MB</InputAdornment>}
        error={error !== undefined}
        label='Size'
        type='number'
        name='size'
        id='size'
        inputProps={{ min: 0.01, step: 0.0001 }}
        onChange={handleChange}
        required
      />
      <FormHelperText error={error !== undefined}>{error}</FormHelperText>
    </>
  );
};

export default DVDTypeDetails;
