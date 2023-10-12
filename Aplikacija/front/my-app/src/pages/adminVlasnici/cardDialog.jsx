import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import classStyles from './styles';
import CardKomentari from './CardKomentari/index.jsx';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import axios from 'axios';

const CardDialog = props => {
  const classes = classStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const { id } = props;
  const token=localStorage.getItem('token')
  const [psi, postaviPse] = useState([]);

  useEffect(() => {
    const TOKEN=localStorage.getItem('token')
    axios.get(
      'https://localhost:5001/Pas/vratiPseZaVlasnika?idVlasnika=' + id,
      {
        headers:{ Authorization: `Bearer ${TOKEN}`}
      }
    ).then(res => {
      postaviPse(res.data);
      console.log(res.data)
    }).catch(err=>
      {
        
      })
  }, [id]);
  //kad god ode na stranu treba da se uradi fetch zato treba da se prosledi ID, kad se promeni vrednost za ID treba da se uradi Fetch
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
        onClick={handleClickOpen('paper')}
      >
        Prikazi pse
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
              {psi && psi.map((k, index) => {
                return <CardKomentari ime={k.ime} rasa={k.rasa} pol={k.pol} opis={k.opis} visina={k.visina} tezina={k.tezina} id={k.id} />;
              })}
            </h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'green' }} onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CardDialog;
