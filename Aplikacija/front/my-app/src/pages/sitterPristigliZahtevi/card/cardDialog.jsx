import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import classStyles from './styles';
import Axios from 'axios';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';

const CardDialog = props => {
  const classes = classStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [recenzije,setRecenzije]=useState('');
  const { idPsa, ime, rasa, pol, visina, tezina, prosecnaOcena, opis } = props;
  useEffect(() => {
async function vrati(){
    const TOKEN=localStorage.getItem('token')
   await Axios.get('https://localhost:5001/Recenzija/vratiRecenzijeZaPsa?id=' + idPsa,
   {
    headers:{ Authorization: `Bearer ${TOKEN}`}
   }).then(
     res=>
     {
       
       setRecenzije(res.data)
     }
   )}
   vrati();
  }, []);

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <div>
      <Button
        style={{ color: 'white', backgroundColor: 'rgb(93, 224, 100)', borderRadius: '20px' }}
        onClick={handleClickOpen('paper')}
      >
        Prikaži informacije o psu
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle style={{ color: 'green' }} id="scroll-dialog-title">
          Informacije:
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
          <Typography variant="h6" color='black'>Osnovni podaci:</Typography>
          <Typography variant="body1" color='black'>Ime psa: {ime}</Typography>
          <Typography variant="body1" color='black'>Rasa psa: {rasa}</Typography>
          <Typography variant="body1" color='black'>Pol psa: {pol}</Typography>
          <Typography variant="body1" color='black'>Visina psa: {visina} CM</Typography>
          <Typography variant="body1" color='black'>Tezina psa: {tezina} KG</Typography>
          <Typography variant="body1" color='black'>Prosecna ocena psa: {prosecnaOcena}</Typography>
          <Typography variant="body1" color='black'>Komentari o psu:</Typography>
          {recenzije && recenzije.map((recenzija,index)=>
          (
          <Typography variant="body1" color='black'>
            {index+1 + ". " + recenzija.komentar} 
          </Typography>
            ))}
          <Typography variant='h6' color='black'>Opis psa:</Typography>
          <Typography variant="body1" color='black'>{opis}</Typography>
         
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{color: 'white', backgroundColor: 'green' }} onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CardDialog;
