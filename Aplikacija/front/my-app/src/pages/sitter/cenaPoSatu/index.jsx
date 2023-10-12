import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields(props) {
  const { setValues: postaviVrednosti, reset, naziv,cenaOd,cenaDo } = props;
  const [values, setValues] = useState('');

  useEffect(() => {
    if (reset) {
      setValues('');
    }
    if (!reset) {
      setValues(cenaOd);
      setValues(cenaDo);
    }
  }, [reset]);
  const handleChange = (event) => {
    const unos = event.target.value;

    let isnum = /^\d+$/.test(unos);
    if (isnum || unos === '') {
      setValues(unos);
    }
  };
  const onBlur = (event) => {
    postaviVrednosti(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        variant="standard"
        label={naziv}
        value={values}
        onChange={handleChange}
        name="numberformat"
        onBlur={onBlur}
      />
    </Box>
  );
}
