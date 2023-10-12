import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import Kartica from './kartice/index.jsx';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import InputAdornment from '@mui/material/InputAdornment';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import IkonicaHome from '../../components/ikonicaHome';
import { vratiSveSitereUrl, filtrirajSitere, vratiSvePse } from '../../backendAddress';
import Gradovi from '../sitter/gradovi';
import CenaPoSatu from '../sitter/cenaPoSatu';
import CardSlika from './card.jsx';
import ProsecnaOcena from '../sitter/prosecnaOcena';
import BrojeviStranica from '../sitter/broj';
import { Box, Grid, TextField } from '@mui/material';
import Axios from 'axios'
import NavBar from '../headerVlasnik';
import Typography from '@mui/material/Typography';
const Sitter = (props) => {
  const navigate = useNavigate();
  const classes = classStyles();
  const [psi, postaviPse] = useState([]);
  const [psiKojiSePrikazuju, postaviPseKojiSePrikazuju] = useState([]);
  const [stranica, postaviStranicu] = useState(1);
  const [ukupanBrojStranica, postaviUkupanBrojStranica] = useState(1);
  const [brojObjavaPoStrani, postaviBrojObjavaPoStrani] = useState(5);
  const [grad, postaviGrad] = useState('');
  const [Ocena, postaviOcenu] = useState('');
  const [cenaOd, postaviCenuOd] = useState('');
  const [cenaDo, postaviCenuDo] = useState('');
 
  const{doggy}=props;


const [refresh,setRefresh]=useState('')
const [logovan,setLogovan]=useState('')
  const[handled,setHandled]=useState('')
  const token=localStorage.getItem('token')
  // useEffect(()=>
  // {
  //   async function fetchData(){
  //   const TOKEN=localStorage.getItem('token')
  // await Axios.get('https://localhost:5001/Auth/vratiTrenutnogKorisnika',
  //   {
  //     headers:{ Authorization: `Bearer ${TOKEN}`
  // }}).then(res=>
  //   {
  //      setLogovan(res.data)
  //      console.log(res.data.id)
  //      setHandle1(!handle1)
  //   })
  // }
  // fetchData();
  // },[])
  useEffect(() => {
    
    const TOKEN=localStorage.getItem('token')
    fetch('https://localhost:5001/Pas/vratiPseZaVlasnika?idVlasnika=' + doggy.id,{
      headers:{
        Authorization: `Bearer ${TOKEN}`
      }
    }).then(async res => {
      const results = await res.json();
      postaviPse(results);

      const objave = [];
      if (results.length > brojObjavaPoStrani) {
        for (let i = 0; i < brojObjavaPoStrani; i++) {
          objave.push(results[i]);
        }
      } else {
        for (let i = 0; i < results.length; i++) {
          objave.push(results[i]);
        }
      }
      postaviPseKojiSePrikazuju(objave);

      if ((results.length / brojObjavaPoStrani) % 1 != 0) {
        //check if number have decimal places, example: 23 % 1 = 0, 23.5 % 1 = 0.5
        postaviUkupanBrojStranica(
          Math.ceil(results.length / brojObjavaPoStrani)
        );
      } else {
        postaviUkupanBrojStranica(results.length / brojObjavaPoStrani);
      }
    }).catch(err=>
      {
        if(err.response.status)
        {
          alert(err.response.data)
        }
      });
  }, [refresh,handled]);

  useEffect(() => {
    const objave = [];
    const start = brojObjavaPoStrani * (stranica - 1);
    if (psi.length > start + brojObjavaPoStrani) {
      for (let i = start; i < start + brojObjavaPoStrani; i++) {
        objave.push(psi[i]);
      }
    } else {
      for (let i = start; i < psi.length; i++) {
        objave.push(psi[i]);
      }
    }
    postaviPseKojiSePrikazuju(objave);
  }, [stranica]);
  const [dozvoli,setdozvoli ] = useState(true)
 const handleRefresh=()=>
  {
    setRefresh(!refresh)
  }
const dodajPsa=async ()=>
{

  const AJDI=doggy.id
const TOKEN=localStorage.getItem('token')

if(token!=TOKEN || !TOKEN)
{
  window.location.reload(false)
  return
}
if(data.ime==='' || data.rasa==='' || data.pol==='' || data.opis==='' || data.visina==='' || data.tezina==='' || data.visina<=0 || data.tezina <=0 || data.tezina>=100 || data.visina>=200)
{
  alert('Molimo Vas popunite pravilno formu!!!')
  return 
}
  await Axios.post('https://localhost:5001/Pas/dodajPsa',
    {
      ime:data.ime,
      rasa:data.rasa,
      pol:data.pol,
      opis:data.opis,
      visina:data.visina,
      tezina:data.tezina,
      vlasnikid:AJDI

    },{ headers: {
      'Authorization': 'Bearer ' + TOKEN
    }}).then(
      res=>
      {
        console.log(res)
        console.log(res.data.id)
        handleRefresh()
      }
    ).catch(err=>
      {
        if(err.response.status)
        {
          alert(err.response.data)
        }
      })
}
const [data,setData]=useState({
  ime:"",
  rasa:"",
  pol:"",
  opis:"",
  visina:0,
  tezina:0,
  vlasnikid:0

})
const handle=(e)=>
{
  const newData={...data}
  newData[e.target.id]=e.target.value;
  setData(newData)
  console.log(newData)
}
const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
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
    <>
    <Box sx={{backgroundColor: 'cornsilk',
               flex: 1,
               display: 'flex',
               flexDirection: 'column',}}>
    <NavBar />
    <Box sx={{display:'flex',
             justifyContent:'center',
             flexDirection:'column'}}>
              <Grid sx={{display:'flex',justifyContent:'center',marginBottom:'40px'}}>
       <Typography variant="h1" >Dodajte vašeg novog psa:</Typography>
              </Grid>
       <Box  style={{textAlign:'center',marginTop:'20px'}}>
         <Fab sx={{backgroundColor:'rgb(93,224,100)',width:'100px', height:'100px'}}   aria-label="add" onClick={handleClickOpen('paper')}>
            <AddIcon sx={{width:'50px',height:'50px'}} />
          </Fab>           
        </Box>
    <Box>
     <Box className='unosPsa' hidden={dozvoli} >
       <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Dodaj novog psa</DialogTitle>
         <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Box sx={{display: 'flex',
                      flexDirection: 'row', 
                      justifyContent:'space-evenly' ,
                       }}>
              <Box sx={{display: 'flex',
                        flexDirection: 'column' ,
                        padding: '10px' }}>
            <Grid container spacing={2} style={{display:'flex',justifyContent:'center',alignItems:'center',width:'400px'}}>
               <Box >
               <Typography variant="h4" ml={1} mb={3} sx={{padding:'5px'}}>Informacije o Vasem psu</Typography>
               </Box>
               <Grid container spacing={2} sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
              <Grid item xs={6} >
              <Typography variant="h6" ml={2}>Ime:</Typography>
             </Grid>
            <Grid item xs={6} >
              <TextField  id='ime'onChange={(e)=>handle(e)} value={data.ime} type="text"></TextField>
            </Grid>
            </Grid>
            <Grid container spacing={2} sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
             <Grid item xs={6}>
                  <Typography variant="h6" ml={2}>Rasa:</Typography>
            </Grid>
            <Grid item xs={6}>
            <TextField id='rasa' onChange={(e)=>handle(e)} value={data.rasa} type="text"></TextField>
            </Grid>
            </Grid>
            <Grid container spacing={2} sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <Grid item xs={6}>
                  <Typography variant="h6" ml={2}>Pol:</Typography>
            </Grid>
            <Grid item xs={6}>
            <TextField onChange={(e)=>handle(e)}id='pol' value={data.pol} type="text"></TextField>
            </Grid>
            </Grid>
            <Grid container spacing={2} sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <Grid item xs={6}>
                  <Typography variant="h6" ml={2}>Opis:</Typography>
            </Grid>
            <Grid item xs={6}>
            <TextField onChange={(e)=>handle(e)} id='opis' value={data.opis} type="text"></TextField>
            </Grid>
            </Grid>
            <Grid container spacing={2} sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <Grid item xs={6}>
                  <Typography variant="h6" ml={2}>Visina:</Typography>
            </Grid>
            <Grid item xs={6}>
            <TextField InputProps={{
            endAdornment: <InputAdornment position="end">CM</InputAdornment>,
          }} inputProps={{min:0}} onChange={(e)=>handle(e)} id='visina' value={data.visina} type="number"></TextField>
            </Grid>
            </Grid>
            <Grid container spacing={2} sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <Grid item xs={6}>
                  <Typography variant="h6" ml={2}>Tezina:</Typography>
            </Grid>
            <Grid item xs={6}>
            <TextField  InputProps={{
            endAdornment: <InputAdornment position="end">KG</InputAdornment>,
          }} inputProps={{min:0}} onChange={(e)=>handle(e)}  id='tezina' value={data.tezina} type="number"></TextField>
            </Grid> 
            </Grid>
        </Grid>
        </Box>
        {/* <CardSlika/> */}
        </Box>
      </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='text'onClick={()=>{dodajPsa();handleClose();}}>Dodaj</Button>
        </DialogActions>
      </Dialog>
            </Box>
            </Box>           
            </Box>
      <Box sx={{ display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                 flex: 1,
                 alignItems: 'center',}}>
        {psiKojiSePrikazuju.map((siter, index) => {
          return (
            <Kartica
            id={siter.id}
              ime={siter.ime}
              rasa={siter.rasa}
              pol={siter.pol}
              opis={siter.opis}
              visina={siter.visina}
              tezina={siter.tezina}
              slika={siter.slika}
              key={index}
              vlasnikid={doggy.id}
            />
          );
        })}
      </Box>
      <Box sx={{ display: 'flex',
                justifyContent: 'center',}}>
        <BrojeviStranica
          ukupanBrojStranica={ukupanBrojStranica}
          postaviStranicu={postaviStranicu}
        />
      </Box>
    </Box>
    </>
  );
};

export default Sitter;
