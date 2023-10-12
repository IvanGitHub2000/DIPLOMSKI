
import * as React from 'react';
import {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import classStyles from './styles';
import { IconButton } from '@mui/material';
import { Badge } from '@mui/material';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import NavBar from '../headerVlasnik';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ButtonGroup from '@mui/material/ButtonGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Avatar } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SwapVertSharp } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Typography from '@mui/material/Typography';

const Vlasnik=(props)=> {
  const[psi,setPsi]=useState('')
  const {vlasnik}=props;

  const location=useLocation();
  console.log(location.state)
  const vratiPseZaVlasnika=async()=>
  {
    console.log(vlasnik)
    const TOKEN=localStorage.getItem('token')
   await Axios.get('https://localhost:5001/Pas/vratiPseZaVlasnika?idVlasnika=' + vlasnik.id,
    {
    headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(
      res=>
      {
        console.log(res.data + 'svi psi')
        setPsi(res.data)
      }
    )
    
  }

  const inputProps = {
    step: 300,
  };
  const navigate=useNavigate();
  
    const klase = classStyles();
    const labels = {
      0.5: 'Useless',
      1: 'Useless+',
      1.5: 'Poor',
      2: 'Poor+',
      2.5: 'Ok',
      3: 'Ok+',
      3.5: 'Good',
      4: 'Good+',
      4.5: 'Excellent',
      5: 'Excellent+',
    };
    
    const[vrsta,setSelect]=useState('');
    const[pocetak,setTajmerOd]=useState('');
    const[kraj,setTajmerDo]=useState('');
    const[adresaPreuzimanjaPsa,setAddr]=useState('');
    const[napomena,setNapomena]=useState('');
    const[pasId,setPasId]=useState('');

const setDogs = (props)=>
{
  setPasId(props)
}

const vlasnikId=vlasnik.id;
const posalji_zahtev=async()=>
{
  const TOKEN=localStorage.getItem('token')
if(pocetak>kraj)
{
  alert('Greska kod datuma!')
  return
}
const siterId=location.state;
  if(siterId===null){alert('Molimo Vas odaberite sitera!!!')}
  const podaci={
    
  vlasnikId,
  siterId,
  pasId,
  vrsta,
  pocetak,
  kraj,
  adresaPreuzimanjaPsa,
  napomena,
  
}
if(vrsta==='' || napomena==='' || pocetak==='' || kraj==='' ||  pasId==='' || adresaPreuzimanjaPsa==='')
{
  alert('Molimo Vas popunite formu do kraja!!!')
  return
}

 await Axios.post('https://localhost:5001/Usluga/dodajUslugu',podaci,{
    
    headers:{ Authorization: `Bearer ${TOKEN}`
  }
}).then(res=>
    {
      console.log(res.data)
      alert('Uspesno ste poslali sitter-u zahtev!!!')
    }).catch(err=>
    {
          if(err.response.data=='Siter je tada zauzet!')
          {
         alert('Siter je tada zauzet!')
          }
          else if(err.response.status){
            alert(err.response.data)
          }
    })
}
const handleSetDogs = async(id) =>
{
    setDogs(id);
}

    return (
    <Box >
    <NavBar />
    <Box sx={{
            backgroundColor: 'rgb(234, 252, 220)',
            justifyContent:'center',
            display:'flex'}}>
   <Paper sx={{
    display:'flex',
    flexDirection:'column',
    borderRadius:'30px',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:'10px',
    marginTop:'10px',
    backgroundColor:'honeydew',
    marginBottom:'40px',
    marginTop:'20px',
    borderRadius:'50px'
   }} onClick={()=>{vratiPseZaVlasnika();}}elevation={8}>
       <IconButton color='primary'  onClick={()=>{navigate('/sitterRoute')}}>
       <ArrowBackIosNewIcon />
       <Typography variant='h6'color='black' onClick={()=>{navigate('/sitterRoute');}} >Nazad</Typography>
       </IconButton>
   <Typography variant='h3' sx={{ justifyContent:'center',
                                  color:'rgb(93,224,100)'
                                  }} mt={2} mb={1}>Kreirajte zahtev</Typography>
   <Box sx={{  display:'flex',
            marginTop: '10px',
            marginBottom:'10px',
            justifyContent:'space-evenly'}}>
     <Box >
  
     <Box sx={3} md={6}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label" >Odaberite vrstu usluge</InputLabel>
      <Select sx={{width:'300px'}}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={vrsta}
        label="Age"
        onChange={(e)=>setSelect(e.target.value)}
        onClick={()=>{}}
      >
        <MenuItem   value={0}><i class="fa-solid fa-dog"><h5>Šetanje psa po gradu</h5></i></MenuItem>
        <MenuItem value={1}><i class="fa-solid fa-house"><h5>Čuvanje psa u vašoj kući</h5></i></MenuItem>
        <MenuItem  value={2}><i class="fa-solid fa-paw"><h5>Poseta sittera</h5></i></MenuItem>
        <MenuItem  value={3}><i class="fa-solid fa-bone"><h5>Čuvanje psa u kući sittera</h5></i></MenuItem>
      </Select>
    </FormControl>
   </Box>
</Box>
</Box>
<Box >
     <Box>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label1" >Odaberite vaseg psa</InputLabel>
      <Select sx={{width:'300px'}}
        labelId="demo-simple-select-label1"
        id="demo-simple-select1"
        value={pasId}
        label="Age"
        onChange={(e)=>{setPasId(e.target.value);}}
       onMouseDown={()=>{vratiPseZaVlasnika();}}
      >
        {psi && psi.map(x=>
          (
        <MenuItem onClick={()=>{handleSetDogs(x.id)}} value={x.id}><i class="fa-solid fa-dog"><h5>{x.ime} </h5></i></MenuItem>
          ))}
      </Select>
    </FormControl>
   </Box>
</Box>
      <Grid container sx={{display:'flex',justifyContent:'center'}} >
       <Grid item xs={6} sx={{marginTop:'20px',marginBottom:'20px'}}>
        <TextField 
          id="datetime-local"
          label="Pocetak usluge"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          onChange={e=>setTajmerOd(e.target.value)}
          value={pocetak}
          InputLabelProps={{
            shrink: true,
          }}
        />
       </Grid>
       
      <Grid item xs={6} sx={{marginBottom:'20px',marginTop:'20px'}}>
      <TextField 
        id="datetime-local"
        label="Kraj usluge"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        onChange={e=>setTajmerDo(e.target.value)}
        value={kraj}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Grid> 
    </Grid>
    <Box >
     <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '300px' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField  id="outlined-size-small" label="Adresa" value={adresaPreuzimanjaPsa} onChange={e=>setAddr(e.target.value)} />
    </Box>
    </Box>
    <Box >
     <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '300px' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id='outlined-multiline-static'label='Napomena' type="text" multiline maxRows={4} inputProps={inputProps} value={napomena} onChange={e=>setNapomena(e.target.value)}/>
     </Box>
     </Box>
     <Box sx={{
       display:'flex',
       marginTop: '10px',
       marginBottom:'10px',
       height:'70px'
     }}>
     <Button variant="contained" onClick={()=>{posalji_zahtev();}} endIcon={<SendIcon />} style={{borderRadius:'50px',backgroundColor:'rgb(93, 224, 100)',color:'black'}}>
      Prosledi zahtev sitteru
     </Button>
     </Box>
    </Paper>
    </Box>
     </Box>
 
  );
}

export default Vlasnik

