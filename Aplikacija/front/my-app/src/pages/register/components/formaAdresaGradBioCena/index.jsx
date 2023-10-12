import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Bio from './components/bio';
import CenaPoSatu from './components/cenaPoSatu';
import Button from '@mui/material/Button';
import Grad from './components/grad';
import Adresa from './components/adresa';

const checkInput = value => (value.length > 3 ? true : false);

const Registracija = props => {
  const { setFormNumber, formNumber } = props;
  const {
    cenaPoSatu,
    setCenaPoSatu,
    bio,
    setBio,
    adresa,
    setAdresa,
    grad,
    setGrad,
    siter,
  } = props;

  const [allValid, setAllValid] = React.useState(false);
  const classes = classStyles();

  useEffect(() => {
    if (checkInput(adresa) && checkInput(grad)) setAllValid(true);
    else setAllValid(false);
  }, [adresa, grad]);

  const nastaviOnClick = () => {
    setFormNumber(formNumber + 1);
  };

  const nazadOnClick = () => {
    setFormNumber(formNumber - 1);
  };

  return (
    <div className={classes.container}>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <div>
          <Paper className={classes.paper}>
            <Adresa adresa={adresa} setAdresa={setAdresa} />
            <Grad grad={grad} setGrad={setGrad} />

            {siter ? <Bio bio={bio} setBio={setBio} /> : null}
            {siter ? (
              <CenaPoSatu
                cenaPoSatu={cenaPoSatu}
                setCenaPoSatu={setCenaPoSatu}
              />
            ) : null}

            <div className={classes.kontrole}>
              <Button
                variant="contained"
                onClick={nazadOnClick}
                style={{ backgroundColor: 'green' }}
              >
                Nazad
              </Button>
              <Button
                variant="contained"
                onClick={nastaviOnClick}
                style={{ backgroundColor: 'green' }}
                disabled={!allValid}
              >
                Nastavi
              </Button>
            </div>
          </Paper>
        </div>
      </Slide>
    </div>
  );
};
export default Registracija;
