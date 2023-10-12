import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import { ValidationTextField } from './styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { vratiSveGradoveSittera } from '../../../../../backendAddress';

const Grad = props => {
  const [validGrad, setValidGrad] = useState(false);
  const { grad, setGrad } = props;
  const classes = classStyles();



  const handleChange = event => {
    setGrad(event.target.value);
  };
 
  return (
   
      
        // helperText={'Ime mora da sadrzi vise od 2 karaktera'}
      
       <form noValidate className={classes.container}>
        <ValidationTextField
          label="Grad"
          type="text"
          autoComplete="off"
          onChange={handleChange}
          required
          variant="outlined"
          aria-invalid={validGrad ? 'false' : 'true'}
          value={grad}
          // helperText={'Ime mora da sadrzi vise od 2 karaktera'}
        />
      </form>
  );
};

export default Grad;
