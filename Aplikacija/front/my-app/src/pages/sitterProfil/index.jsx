import { styles } from './styles';
import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'
//import HeaderSitter from '../../components/HeaderSitter';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NavBar from '../headerVlasnik';
import DeleteIcon from '@mui/icons-material/Delete';
import CardSlika from './card.jsx';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import axios from '../../api/axios';
import { Typography } from '@mui/material';
import Footer from '../../components/Footer'
import NavBarSiter from '../headerSiter';
import Card from '@mui/material/Card';
const SitterProfil =(props)=>
{

const[profil,setProfil]=useState([])
{console.log(profil)}
const {user}=props;
const token=localStorage.getItem('token')
useEffect(()=>
{async function vratiSitera(){
   const TOKEN=localStorage.getItem('token')
   await Axios.get('https://localhost:5001/Siter/vratiSiteraPoId?id=' + user.id,
   {
    headers:{ Authorization: `Bearer ${TOKEN}`
   }}).then(
       res=>
       {
           console.log(res)
          setProfil(res.data)
          setData(res.data)
       }
    )}
    vratiSitera();
},[])

const [data,setData]=useState(
   {
      id:0,
      ime:'',
      prezime:'',
      email:'',
      korisnickoIme:'',
      sifra:'',
      brojTelefona:'',
      grad:'',
      adresa:'',
      cenaPoSatu:'',
      bio:''
      
   })
 
const azuriraj=async()=>
{  {console.log('2')}
   {console.log(profil)}
   const TOKEN=localStorage.getItem('token')
   await Axios.put('https://localhost:5001/Siter/azurirajSitera',
{
   id:profil.id,
   ime:profil.ime,
   prezime:profil.prezime,
   korisnickoIme:profil.korisnickoIme,
   sifra:profil.sifra,
   brojTelefona:profil.brojTelefona,
   grad:profil.grad,
   adresa:profil.adresa,
   cenaPoSatu:profil.cenaPoSatu,
   bio:profil.bio
},{
    headers:{ Authorization: `Bearer ${TOKEN}`
}}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
   const izmeniIme=async()=>{
if(user.id==='')
   {
      alert('Greska!!!')
   }
   if(profil.ime==='')
   {
     alert('Polje ime ne sme biti prazno!')
     return
   }
   if(profil.ime.length>20)
   {
      alert('Duzina imena ne sme biti duze od 20 karaktera!')
      return
   }
   const TOKEN=localStorage.getItem('token')
   await Axios.put('https://localhost:5001/Siter/azurirajSitera',
{
   id:user.id,
   ime:profil.ime,
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
const izmeniPrezime=async()=>{
const TOKEN=localStorage.getItem('token')
if(user.id==='')
   {
      alert('Greska!!!')
   }
if(profil.prezime==='')
          {
            alert('Polje prezime ne sme biti prazno!')
            return
          }
          if(profil.prezime.length>30)
          {
             alert('Duzina prezimena ne sme biti duze od 30 karaktera!')
             return
          }
   await Axios.put('https://localhost:5001/Siter/azurirajSitera',
{
   id:user.id,
   prezime:profil.prezime,
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
         
      }
      )
   }
   const izmeniKorisnickoIme=async()=>
{  
   const TOKEN=localStorage.getItem('token')
   if(user.id==='')
   {
      alert('Greska!!!')
   }
   if(profil.korisnickoIme==='')
   {
     alert('Polje korisnicko ime ne sme biti prazno!!!')
     return
   }
   await Axios.put('https://localhost:5001/Siter/azurirajSitera',
{
   id:user.id,
   korisnickoIme:profil.korisnickoIme,
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`
}}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
         
      }
      ).catch((error)=>
      {
         if(error.response.status)
         {
            alert(error.response.data)
         }
      })
   }

   const izmeniSifru=async()=>
{ 
   const TOKEN=localStorage.getItem('token')
   if(user.id==='')
   {
      alert('Greska!!!')
   }
   if(profil.sifra==='')
   {
     alert('Polje sifra ne sme biti prazno!!!')
     return
   }
   if(profil.sifra.length>=20)
   {
     alert('Polje sifra ne sme imati vise od 20 karaktera!!!')
     return
   }
  await Axios.put('https://localhost:5001/Siter/azurirajSitera',
{
   id:user.id,
   sifra:profil.sifra,
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
   const izmeniBrojTelefona=async()=>
   {  
   const TOKEN=localStorage.getItem('token')
   if(user.id==='')
   {
      alert('Greska!!!')
   }
   if(profil.brojTelefona==='')
   {
     alert('Polje broj telefona ne sme biti prazno!!!')
     return
   }
  await Axios.put('https://localhost:5001/Siter/azurirajSitera',
{
   id:user.id,
   brojTelefona:profil.brojTelefona,
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
   const izmeniGrad=async()=>
{ 
   const TOKEN=localStorage.getItem('token')
   if(user.id==='')
   {
      alert('Greska!!!')
   }
   if(profil.grad==='')
   {
     alert('Polje grad ne sme biti prazno!!!')
     return
   }
  await Axios.put('https://localhost:5001/Siter/azurirajSitera',
{
   id:user.id,
   grad:profil.grad,
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
       const izmeniAdresu=async()=>
      {  
         
         const TOKEN=localStorage.getItem('token')
         if(user.id==='')
         {
            alert('Greska!!!')
         }
         if(profil.adresa==='')
         {
         alert('Polje adresa ne sme biti prazno!!!')
         return
         }
      await Axios.put('https://localhost:5001/Siter/azurirajSitera',
      {
         id:user.id,
         adresa:profil.adresa,
      },
      {
         headers:{ Authorization: `Bearer ${TOKEN}`}
      }
         ).then(
            res=>
            {
               console.log(res)
               setProfil(res.data)
               setData(res.data)
               window.location.reload(false)
               
            }
            )
         }
   const izmeniCenuPoSatu=async()=>{
const TOKEN=localStorage.getItem('token')
if(user.id==='')
   {
      alert('Greska!!!')
      return
   }
if(profil.cenaPoSatu<=0)
{
   alert('Molimo Vas unesite validan broj veci od nule!!!')
   return
}
if(profil.cenaPoSatu==='')
{
   alert('Polje cena po satu ne sme biti prazno!!!')
   return
}
   await Axios.put('https://localhost:5001/Siter/azurirajSitera',
{
   id:user.id,
   cenaPoSatu:profil.cenaPoSatu,
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
   const izmeniBio=async()=>
   { 
   const TOKEN=localStorage.getItem('token')
   if(user.id==='')
   {
      alert('Greska!!!')
      return
   }
   if(profil.bio==='')
   {
      alert('Polje biografija ne sme biti prazno!!!')
      return
   }
   await Axios.put('https://localhost:5001/Siter/azurirajSitera',
{
   id:user.id,
   bio:profil.bio
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
    const[ch,setCh]=useState(true)
  const HandleCh=()=>
   {
      const TOKEN=localStorage.getItem('token')
      if(token!=TOKEN || !TOKEN)
      {
         window.location.reload(false)

         return
      }
      setCh(!ch)

   }
      const classes = classStyles();
          return(
           <>
           <Box container  sx={{
            display:'grid',
                     backgroundColor:'cornsilk'}}>
           <NavBarSiter />
             <Box container sx={{
                display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-around',
            flexWrap:'wrap'
              }}>
             <CardSlika korisnik={user}/>
             <Card   elevation={8} style={{display:'flex',flexDirection: 'column'  ,padding: '20px', backgroundColor:'khaki',width:'500px',marginBottom:'40px',marginTop:'40px',borderRadius:'50px'}}>
            <Box sx={{textAlign:'center'}}>
             <Typography variant='h3' sx={{color:'green',margin:'10px'}}>Opšti podaci</Typography>
             </Box>
             <div>
                  <Grid>
             <Grid container spacing={1} sx={{ display: 'flex', justifyContent:'space-around',alignItems:'center', margin:'2px' }}  >
               <Grid item xs={2} >
                  <label>Ime:</label>
               </Grid>
               <Grid item >
                  <input
                     value={profil.ime}
                     style={{ borderRadius: '10px'}} 
                     onChange={(e) => setProfil((profil) => ({ ...profil, ime: e.target.value }))}
                     disabled={ch}
                     className={classes.inputField}
                  ></input>
               </Grid>
                     <Button  onClick={() => { izmeniIme(); }} startIcon={<EditIcon />} > Izmeni </Button> 
               </Grid>

               <Grid container spacing={1} sx={{ display: 'flex', justifyContent:'space-around',alignItems:'center',margin:'2px' }}  >
                <Grid item  xs={2}>
                   <label>Prezime:</label>
                </Grid>
                <Grid item  >
                  <input type='text' value={profil.prezime} style={{borderRadius:'10px'}}onChange={ (e) =>  setProfil((profil)=>({...profil,prezime:e.target.value})) }  disabled={ch}></input>
                </Grid>
                  <Button onClick={()=>{izmeniPrezime();}}startIcon={<EditIcon/>}> Izmeni </Button>
               </Grid>

               <Grid container spacing={1} sx={{ display: 'flex', justifyContent:'space-around',alignItems:'center',margin:'2px' }}  >
             <Grid item xs={2}>
                   <label >Korisničko Ime:</label>
             </Grid>
             <Grid item>
             <input type='text'value={profil.korisnickoIme}style={{borderRadius:'10px'}} onChange={ (e) =>  setProfil((profil)=>({...profil,korisnickoIme:e.target.value})) }  disabled={ch}></input>
             </Grid>
             <Button onClick={()=>{izmeniKorisnickoIme();}}startIcon={<EditIcon/>}> Izmeni </Button>
             </Grid>
             
             <Grid container spacing={1}  sx={{ display: 'flex', justifyContent:'space-around',alignItems:'center',margin:'2px' }}  >
             <Grid item xs={2}>
                   <label>Sifra:</label>
             </Grid>
             <Grid item >
             <input type='password' style={{borderRadius:'10px'}}onChange={ (e) => setProfil((profil)=>({...profil,sifra:e.target.value}))}  disabled={ch}></input>
             </Grid>
             <Button onClick={()=>{izmeniSifru();}}startIcon={<EditIcon/>}> Izmeni </Button>
             </Grid>

             <Grid container spacing={1}  sx={{ display: 'flex', justifyContent:'space-around',alignItems:'center', margin:'2px' }}  >
             <Grid item  xs={2} >
                   <label>Broj telefona:</label>
             </Grid>
             <Grid item>
             <input type='text' style={{borderRadius:'10px'}} value={profil.brojTelefona} onChange={ (e) =>  setProfil((profil)=>({...profil,brojTelefona:e.target.value})) }  disabled={ch}></input>
             </Grid> 
             <Button onClick={()=>{izmeniBrojTelefona();}}startIcon={<EditIcon/>}> Izmeni </Button>
             </Grid>
             
             <Grid container spacing={1}  sx={{ display: 'flex', justifyContent:'space-around',alignItems:'center', margin:'2px' }}  >
             <Grid item xs={2}>
                   <label>Grad:</label>
            </Grid>
            <Grid item  >
             <input type='text' style={{borderRadius:'10px'}}value={profil.grad} onChange={ (e) =>  setProfil((profil)=>({...profil,grad:e.target.value}))}  disabled={ch}></input>
             </Grid> 
             <Button onClick={()=>{izmeniGrad();}}startIcon={<EditIcon/>}> Izmeni </Button>
             </Grid>

             <Grid container spacing={1}  sx={{ display: 'flex', justifyContent:'space-around',alignItems:'center', margin:'2px' }}  >
             <Grid item xs={2}>
                   <label>Adresa:</label>
            </Grid>
            <Grid item >
             <input type='text' style={{borderRadius:'10px'}} value={profil.adresa} onChange={ (e) =>  setProfil((profil)=>({...profil,adresa:e.target.value}))}   disabled={ch}></input>
             
             </Grid>
             <Button onClick={()=>{izmeniAdresu();}}startIcon={<EditIcon/>}> Izmeni </Button>
            </Grid>

            <Grid container spacing={1}  sx={{ display: 'flex', justifyContent:'space-around',alignItems:'center', margin:'2px' }}  >
             <Grid item xs={2}>
                   <label>Cena po satu:</label>
            </Grid>
            <Grid item >
             <input type='number' style={{borderRadius:'10px'}}  value={profil.cenaPoSatu} onChange={ (e) =>  setProfil((profil)=>({...profil,cenaPoSatu:e.target.value}))}  disabled={ch}></input>
           
             </Grid>
             <Button onClick={()=>{izmeniCenuPoSatu();}}startIcon={<EditIcon/>}> Izmeni </Button>
             </Grid>
             </Grid>

              <Grid >
               <Grid sx={{textAlign:'center'}} mt={2}>
               <label >Biografija:</label>
               </Grid>
             <TextField 
          id="outlined-multiline-static"
          multiline
          rows={4}
          value={profil.bio}
          style={{display:'flex',marginTop:'20px'}}
          onChange={ (e) =>  setProfil((profil)=>({...profil,bio:e.target.value})) }
          disabled={ch}
          />
          </Grid>
             </div>
              <Button style={{textAlign:'center'}}onClick={()=>{izmeniBio();}}startIcon={<EditIcon/>}> Izmeni </Button>
             <div className='izmeniVlasnika' style={{display:'flex',marginTop:'20px',justifyContent:'center'}}>
      <Button variant="outlined" startIcon={<EditIcon />} onClick = {() => { HandleCh(); }} style={{backgroundColor:'rgb(93, 224, 100)',color:'black',borderRadius:'25px',margin:'10px'}}>
  Edituj podatke
    </Button>
  </div>
</Card>
 </Box>
 <Footer/>
  </Box>
       </>
          );
    }
  

export default  SitterProfil