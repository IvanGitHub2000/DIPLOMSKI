import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Bio from './components/bio';
import CenaPoSatu from './components/cenaPoSatu';
import Button from '@mui/material/Button';
import Grad from './components/grad';
import Adresa from './components/adresa';

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;

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
    if (NAME_REGEX.test(adresa) && NAME_REGEX.test(grad)) setAllValid(true);
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
      {/* <iframe title='myfeame' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22864.11283411948!2d-73.96468908098944!3d40.630720240038435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sbg!4v1540447494452" width="100%" height="380" frameBorder="0" allowFullScreen></iframe> */}
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
