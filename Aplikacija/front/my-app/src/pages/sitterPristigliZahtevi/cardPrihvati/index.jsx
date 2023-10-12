import React, { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CardDialog from './cardDialog.jsx';
import classStyles from './styles.jsx';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CardPrihvaceneUsluge(props) {
      const{id, ime, prezime, korisnickoIme, brojTelefona, email, grad, adresa, pasId, napomena, idSittera, vlasnikId,tip,begin,end}=props;
      const navigate = useNavigate();
      const classes = classStyles();
      const[data,setData]=useState([]);
      const [open, setOpen] = React.useState(false);
      const[type,setType]=useState('')

      let PocetakDatum=new Date(begin).toLocaleDateString();
      let PocetakVreme = new Date(begin).toLocaleTimeString(['hr-HR'],{hour:'2-digit',minute:'2-digit'});
      let KrajDatum= new Date(end).toLocaleDateString();
      let KrajVreme = new Date(end).toLocaleTimeString(['hr-HR'],{hour:'2-digit',minute:'2-digit'})

      useEffect(()=>
      {
          if(tip==0)
          {
            setType('Setanje psa')
          }
          if(tip==1)
          {
            setType('Cuvanje psa u kuci vlasnika')
          }
          if(tip==2)
          {
            setType('Poseta sittera')
          }
          if(tip==3)
          {
            setType('Cuvanje psa u kuci sittera')
          }

      })

      useEffect(() => {
        async function vrati(){
        const TOKEN=localStorage.getItem('token')
        await Axios.get('https://localhost:5001/Pas/vratiPsaPoId?idPas=' + pasId,
        {
    headers:{ Authorization: `Bearer ${TOKEN}`}
        }).then(res=>
        {
          setData(res.data)

       })}
       vrati();
       }, []);

  return(
      <div className={classes.miniContainer} >
      <Card sx={{ maxWidth: 345 }} hidden={open} style={{margin:'25px',borderRadius:'25px',backgroundColor:'khaki'}}>
      <CardContent>
      <Typography color="black" sx={{ fontSize: 30 }} component="div">Zahtev od {ime} {prezime}</Typography>
      <Typography  sx={{ fontSize: 25 }} component="div" >Informacije o korisniku: </Typography> 
      <Typography variant="body1" > Korisnicko ime: {korisnickoIme}</Typography>
      <Typography variant="body1" > Broj telefona: {brojTelefona}</Typography>
      <Typography variant="body1" > Email: {email} </Typography>
      <Typography variant="body1" > Grad: {grad}  </Typography>
      <Typography variant="body1" > Adresa: {adresa} </Typography> 
      <Typography variant="body1" > Vrsta usluge: {type}</Typography>
      <Typography variant="body1" > Pocetak usluge: {PocetakDatum} u {PocetakVreme}</Typography>
      <Typography variant="body1" > Kraj usluge: {KrajDatum} u {KrajVreme}</Typography>
      
      </CardContent>
     
      <CardActions disableSpacing>
        <CardDialog idPsa={pasId} ime={data.ime} rasa={data.rasa} pol={data.pol} visina={data.visina} tezina={data.tezina} prosecnaOcena={data.prosecnaOcena} opis={data.opis} idSittera={idSittera} vlasnikId={vlasnikId} id={id} napomena={napomena}/>
      </CardActions>
    </Card>
    </div>
);                                           
}