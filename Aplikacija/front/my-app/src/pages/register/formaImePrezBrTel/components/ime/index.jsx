import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import { ValidationTextField } from './styles';

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;

const Ime = props => {
  const [validIme, setValidIme] = useState(false);
  const { ime, setIme } = props;
  const classes = classStyles();

  useEffect(() => {
    const result = NAME_REGEX.test(ime);
    setValidIme(result);
  }, [ime]);

  return (
    <form noValidate className={classes.container}>
      <ValidationTextField
        label="Ime"
        type="text"
        autoComplete="off"
        onChange={e => setIme(e.target.value)}
        value={ime}
        required
        variant="outlined"
        aria-invalid={validIme ? 'false' : 'true'}
        helperText={'Ime mora da sadrzi vise od 2 karaktera'}
      />
    </form>
  );
};

export default Ime;
