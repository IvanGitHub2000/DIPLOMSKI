import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import classStyles from './styles';
import CardComments from './components/CardComments';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';

const CardDialog = props => {

  const token=localStorage.getItem('token')
  const classes = classStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const { idSitera } = props;
  const [komentari, setKomentari] = useState([]);

  function formatDateTime(inputDateTime) {
    const dateTime = new Date(inputDateTime);
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(dateTime.getDate()).padStart(2, '0');
    const year = dateTime.getFullYear();
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');
  
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  }
  const handleClick=() => {
      const TOKEN=localStorage.getItem('token')
      if(token!=TOKEN || !TOKEN)
      {
        window.location.reload(false)
        return
      }
   fetch(
      'https://localhost:5001/Recenzija/vratiRecenzijeZaSitera?id=' + idSitera,
    {
      headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(async res => {
      {console.log(idSitera)}
      const recenzijeZaSveSitere = await res.json();
      const recenzije = recenzijeZaSveSitere.filter(
        recenzijeZaSveSitere => recenzijeZaSveSitere.siterId == idSitera
      );
      setKomentari(recenzije);
      {console.log(komentari)}
    });
  };
  const handleClickOpen = scrollType => () => {
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
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
        style={{ color: 'white', backgroundColor: '#07a607' }}
        onClick={()=>{setOpen(true);handleClick();}}
      >
        Prikazi komentare i ocene
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle style={{ color: 'green' }} id="scroll-dialog-title">
          Odgovor:
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <h5 style={{ color: 'black' }}>
              {komentari.map((komentar, index) => {
                return (
                  <CardComments
                    key={index}
                    id={komentar.id}
                    vreme={formatDateTime(komentar.vreme)}
                    komentar={komentar.komentar}
                    ocena={komentar.ocena}
                  />
                );
              })}
            </h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'green' }} onClick={handleClose}>
            Otkazi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CardDialog;
