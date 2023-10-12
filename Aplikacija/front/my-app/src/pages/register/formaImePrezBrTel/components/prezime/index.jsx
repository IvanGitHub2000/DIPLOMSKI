import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import { ValidationTextField } from './styles';

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;

const Prezime = props => {
  const [validPrezime, setValidPrezime] = useState(false);
  const { prezime, setPrezime } = props;
  const classes = classStyles();

  useEffect(() => {
    const result = NAME_REGEX.test(prezime);
    setValidPrezime(result);
  }, [prezime]);

  return (
    <form noValidate className={classes.container}>
      <ValidationTextField
        label="Prezime"
        type="text"
        id="validation-outlined-input"
        autoComplete="off"
        onChange={e => setPrezime(e.target.value)}
        required
        variant="outlined"
        value={prezime}
        aria-invalid={validPrezime ? 'false' : 'true'}
        helperText={'Prezime mora da sadrzi vise od 2 karaktera'}
      />
    </form>
  );
};

export default Prezime;
