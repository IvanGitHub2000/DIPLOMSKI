import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import classStyles from './style';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import { komentarisanjeIOcenjivanjeRoute } from '../../../../../router/routes';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = props => {
  const { children, onClose, ...other } = props;
  const { brojTelefona } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            // color: theme => theme.palette.grey[500],
            color: 'green',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const token=localStorage.getItem('token')
  const classes = classStyles();
  const [open, setOpen] = React.useState(false);
  const {
    opis,
    brojTelefona,
    grad,
    prosecnaOcena,
    adresa,
    cenaPoSatu,
    dostupan,
    id,
  } = props;

  const [com, setCom] = useState('');
  const komentari = async (props) => {
    const TOKEN=localStorage.getItem('token')
    await Axios.get(
      'https://localhost:5001/Recenzija/vratiRecenzijeZaSitera?id=' + props
    ,{
      headers:{Authorization:`Bearer ${TOKEN}`}
    }).then(res => {
      setCom(res.data);
    });
  };
  const handleClickOpen = () => {
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          handleClickOpen();
          komentari(id);
        }}
        size="small"
        style={{backgroundColor:'rgb(93, 224, 100)'}}
      >
        Pogledaj sittera
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Informacije o siteru
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Opis sitera:</Typography>
          <Typography gutterBottom>{opis}</Typography>
          <Typography gutterBottom>Broj telefona : {brojTelefona}</Typography>
          <Typography gutterBottom>Grad : {grad}</Typography>
          <Typography gutterBottom>Adresa : {adresa}</Typography>
          <Typography gutterBottom>Cena po satu: {cenaPoSatu} EUR</Typography>

          <div className={classes.divButton}>
            <Button
              style={{
                backgroundColor: 'rgb(93, 224, 100)',
                color: 'white',
              }}
              onClick={() => {
                // localStorage.setItem('idSitera', id);
                navigate(komentarisanjeIOcenjivanjeRoute,{state:id});
              }}
            >
              Vidi recenzije o siteru
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          {/* style={{ backgroundColor: '#2ac94d', margin: 15 }} */}
          <Button autoFocus onClick={handleClose} style={{ color: 'green' }}>
            Zatvori
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
