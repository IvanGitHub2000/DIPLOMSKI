import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import { ValidationTextField } from './styles';

export const NUMBER_REGEX = /^\d+$/;

const BrojTelefona = props => {
  const { brojTelefona, setBrojTelefona } = props;
  const classes = classStyles();

  const postaviBrojTelefona = ev => {
    const brTel = ev.target.value;
    const valid = NUMBER_REGEX.test(brTel);
    if (valid) setBrojTelefona(brTel);
  };

  return (
    <form noValidate className={classes.container}>
      <ValidationTextField
        type="text"
        label="Broj telefona"
        id="validation-outlined-input"
        autoComplete="off"
        onChange={postaviBrojTelefona}
        required
        variant="outlined"
        value={brojTelefona}
      />
    </form>
  );
};

export default BrojTelefona;
