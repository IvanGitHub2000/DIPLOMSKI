import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import classStyles from './styles';
import  Modal  from '@mui/material/Modal';
export default function CardKomentari(props) {
  const { ime, rasa,pol,opis,visina,tezina, id } = props;

  const classes = classStyles();
  const [obrisiKomentar, setObrisiKomentar] = useState([]);
  
  const [recenzijePsa, setRecenzijaPsa] = useState([]);

  useEffect(() => {
    const TOKEN=localStorage.getItem('token')
    fetch('https://localhost:5001/Recenzija/vratiRecenzijeZaPsa?id=' + id,
    {
      headers:{Authorization:`Bearer ${TOKEN}`}
    }).then(
      async res => {
        const rez = await res.json();
        setRecenzijaPsa(rez);
      }
    );
  });



  const obrisiRecenziju = (idRecenzije) => {
    const TOKEN=localStorage.getItem('token')
    fetch(
      'https://localhost:5001/Recenzija/obrisiRecenziju?idRecenzija=' + idRecenzije,
      {
        method: 'DELETE',
        headers:{Authorization:`Bearer ${TOKEN}`}
      }
    ).then(async response => {
      if (response.ok) {
        const res = await response.json();
        window.location.reload(false)

        setObrisiKomentar(res);
      } else {
        alert('Greska!');
      }
    });
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
  return (
    <div className={classes.miniContainer}>
      <Card
        style={{
          display: 'flex',
          margin: 10,
          width: '500px',
          borderRadius: '30px',
          backgroundColor: 'rgb(214 246 209)',

          flexDirection: 'column',
        }}
      >
        <CardContent>
          <Typography
            color="#006f03"
            sx={{ fontSize: 25 }}
            component="div"
            gutterBottom
          ></Typography>
          <Typography sx={{ fontSize: 18 }}>Ime:{ime}</Typography>
          <Typography sx={{ fontSize: 18 }}>Rasa: {rasa}</Typography>
          <Typography sx={{ fontSize: 18 }}>Pol:{pol}</Typography>
          <Typography sx={{ fontSize: 18 }}>Opis: {opis}</Typography>
          <Typography sx={{ fontSize: 18 }}>Visina:{visina}</Typography>
          <Typography sx={{ fontSize: 18 }}>Tezina: {tezina}</Typography>

          {recenzijePsa.map((recenzija, index) => {
            return (
              <CardContent
                style={{
                  border: '1px solid green',
                  margin: '5px',
                  borderRadius: '10px',
                }}
              >
                <Typography sx={{ fontSize: 18 }}>
                  Vreme: {recenzija.vreme}
                </Typography>

                <Typography sx={{ fontSize: 18 }}>
                  Komentar: {recenzija.komentar}
                </Typography>
                <Typography sx={{ fontSize: 18 }}>
                  {' '}
                  Ocena: {recenzija.ocena}
                  {/* idrecnzije: {recenzija.id} */}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    style={{ color: 'white', backgroundColor: '#07a607' }}
                    onClick={() => {handleOpenModal();}}
                  >
                    Obrisi
                  </Button>
                  <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
           Da li zaiste zelite da obrisete ovu recenziju?
          </Typography>
                  <Button type='button' className="btn btn-primary" onClick={()=>{obrisiRecenziju(recenzija.id)}} >Potvrdi</Button>
        <Button type='button' className="btn btn-outline-primary ms-1" onClick={handleCloseModal} >Zatvori</Button>
                
        </Box>
      </Modal>
                </div>
              </CardContent>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
