import React, { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMore from'@mui/icons-material/ExpandMore';
import CardDialog from './cardDialog.jsx';
import classStyles from './styles.jsx';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CardPristigliZahtevi(props) {
      const{id, ime, prezime, korisnickoIme, brojTelefona, email, grad, adresa, pasId, napomena,tip,begin,end}=props;
      const navigate = useNavigate();
      const classes = classStyles();
      const[data,setData]=useState([]);
      const[type,setType]=useState('')
      const token=localStorage.getItem('token')
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
      },[])
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

       const prihvati_uslugu = async(id)  =>
       {
         const TOKEN=localStorage.getItem('token')
           await Axios.put('https://localhost:5001/Usluga/azurirajStatusUsluge?idUsluge=' + id + '&status=1',{},
           {
            headers:{Authorization: `Bearer ${TOKEN}`}
           }).then(res =>
               { 
                   alert('Uspesno ste prihvatili uslugu!')
                   window.location.reload(false)
                 } 
                ).catch((error)=>
             {
               alert(error.response.data)
             
             })
       }
const odbij_uslugu=async(id) =>
{
  const TOKEN=localStorage.getItem('token')
    await Axios.put('https://localhost:5001/Usluga/azurirajStatusUsluge?idUsluge=' + id + '&status=2',{},
    {
    headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(
        res =>
        {
            console.log('Odbijena usluga sa idejem: ' + props)
            alert('Odbili ste ovu uslugu!')
            window.location.reload(false)
          }
          ).catch((err)=>
          {
                       alert(err.response.data)
          })
}

      return(
          <div className={classes.miniContainer} >
<Card sx={{ maxWidth: 600 }} style={{margin:'25px',borderRadius:'25px',backgroundColor:'khaki'}} >

       <CardContent>
         <Typography color="black" sx={{ fontSize: 30 }} component="div">Zahtev od {ime} {prezime}</Typography>
         <Typography sx={{ fontSize: 25 }}component="div" >Informacije o korisniku: </Typography> 
         <Typography variant="body1" > Korisnicko ime: {korisnickoIme}</Typography>
         <Typography variant="body1" > Broj telefona: {brojTelefona}</Typography>
         <Typography variant="body1" > Email: {email} </Typography>
         <Typography variant="body1" > Grad: {grad}  </Typography>
         <Typography variant="body1" > Adresa: {adresa}</Typography> 
         <Typography variant="body1" > Tip usluge: {type}</Typography> 
         <Typography variant="body1" > Pocetak usluge: {PocetakDatum} u  {PocetakVreme}</Typography>
         <Typography variant="body1" >Kraj usluge: {KrajDatum} u {KrajVreme} </Typography>  
         <Typography variant="body1">Napomena: {napomena}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        
          <DoneOutlineIcon style={{color:'rgb(93, 224, 100)'}} onClick={()=> prihvati_uslugu(id)} />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon style={{color:'black'}} onClick={()=> odbij_uslugu(id)}/>
        </IconButton>
        
        <CardDialog idPsa={pasId} ime={data.ime} rasa={data.rasa} pol={data.pol} visina={data.visina} tezina={data.tezina} prosecnaOcena={data.prosecnaOcena} opis={data.opis}  />
        </CardActions>
   
    </Card> 
</div>
);                                           
}