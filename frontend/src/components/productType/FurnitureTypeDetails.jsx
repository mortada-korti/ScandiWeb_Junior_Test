import { useEffect } from "react";

// @mui
import {
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const FurnitureTypeDetails = ({ handleChange, setDesc, errors }) => {
  const error = {
    height: errors[0],
    width: errors[1],
    length: errors[2],
  };

  useEffect(() => {
    setDesc("Please, provide dimensions in HxWxL format");
  }, []);

  return (
    <>
      <InputLabel error={error.height !== undefined}>Height</InputLabel>
      <OutlinedInput
        startAdornment={<InputAdornment position='start'>CM</InputAdornment>}
        error={error.height !== undefined}
        label='Height'
        type='number'
        name='height'
        id='height'
        inputProps={{ min: 0.01, step: 0.0001 }}
        onChange={handleChange}
        required
      />
      <FormHelperText error={error.height !== undefined}>
        {error.height}
      </FormHelperText>

      <InputLabel error={error.width !== undefined}>Width</InputLabel>
      <OutlinedInput
        startAdornment={<InputAdornment position='start'>CM</InputAdornment>}
        error={error.width !== undefined}
        label='Width'
        type='number'
        name='width'
        id='width'
        inputProps={{ min: 0.01, step: 0.0001 }}
        onChange={handleChange}
        required
      />
      <FormHelperText error={error.width !== undefined}>
        {error.width}
      </FormHelperText>

      <InputLabel error={error.length !== undefined}>Length</InputLabel>
      <OutlinedInput
        startAdornment={<InputAdornment position='start'>CM</InputAdornment>}
        error={error.length !== undefined}
        label='Length'
        type='number'
        name='length'
        id='length'
        inputProps={{ min: 0.01, step: 0.0001 }}
        onChange={handleChange}
        required
      />

      <FormHelperText error={error.length !== undefined}>
        {error.length}
      </FormHelperText>
    </>
  );
};

export default FurnitureTypeDetails;
