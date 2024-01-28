import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { ReactPropTypes } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Input({half,name,autoFocus,handleChange,type,handleShowPassword,label,helperText,errorLabel,value}) {
  return (
    <Grid item xs={12} sm={half?6:12}>
        <TextField
          name={name}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label={label}
          value={value}
          error={errorLabel}
          autoFocus={autoFocus}
          type={type}
          helperText={helperText}
          InputProps={name === 'password' ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === 'password' || type === 'confirmpassword' ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          } : {}}
        />
    </Grid>
  )
}

export default Input



