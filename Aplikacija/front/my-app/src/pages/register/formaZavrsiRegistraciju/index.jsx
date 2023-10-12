import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import classStyles from './styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

const Registracija = props => {
  const classes = classStyles();
  const {
    setFormNumber,
    formNumber,
    setZavrsiRegistraciju,
    zavrsiRegistraciju,
  } = props;

  const nazadOnClick = () => {
    setFormNumber(formNumber - 1);
  };

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <div>
        <Paper className={classes.paper}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            style={{ textAlign: 'center' }}
          >
            Bravo, uspešno ste uneli sve podatke!
          </Typography>
          <Typography
            gutterBottom
            component="div"
            style={{ textAlign: 'center' }}
          >
            ~Kada završite registraciju, administrator mora da odobri Vaš nalog
            da bi ste mogli da ga koristite.
          </Typography>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.divButton}
              variant="contained"
              onClick={nazadOnClick}
              style={{ backgroundColor: 'green', marginRight: 20 }}
            >
              Nazad
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: 'green' }}
              onClick={() => setZavrsiRegistraciju(true)}
              disabled={zavrsiRegistraciju}
            >
              Zavrsi registraciju
            </Button>
          </div>
        </Paper>
      </div>
    </Slide>
  );
};

export default Registracija;
