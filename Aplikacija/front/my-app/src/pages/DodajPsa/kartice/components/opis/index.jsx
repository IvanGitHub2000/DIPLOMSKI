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
import classStyles from './style.jsx';
import Popper from '@mui/material/Popper';
import Axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { komentarisanjeIOcenjivanjeRoute } from '../../../../../router/routes.jsx';
import { Restaurant } from '@mui/icons-material';
import { display } from '@mui/system';
import { Box, Grid } from '@mui/material';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { useState,useEffect } from 'react';
import { Popover } from '@mui/material';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import CardSlika from '../../../card.jsx';
import Sitter from '../../../index.jsx';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
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
  const classes = classStyles();
  const [logovan,setLogovan]=useState('')
  const[handleKorisnik,setHandleKorisnik]=useState('')
  const token=localStorage.getItem('token')
  const [stranica, postaviStranicu] = useState(1);
  const [ukupanBrojStranica, postaviUkupanBrojStranica] = useState(1);
  const [brojObjavaPoStrani, postaviBrojObjavaPoStrani] = useState(5);
  const [psiKojiSePrikazuju, postaviPseKojiSePrikazuju] = useState([]);
  const [psi, postaviPse] = useState([]);

  useEffect(()=>
  {
    async function fetchData(){
    const TOKEN=localStorage.getItem('token')
    await Axios.get('https://localhost:5001/Auth/vratiTrenutnogKorisnika',
    {
      headers:{ Authorization: `Bearer ${TOKEN}`
  }}).then(res=>
    {
       setLogovan(res.data)
       console.log(res.data.id)
       setHandleKorisnik(!handleKorisnik)
    })
  }
  fetchData();
  },[])
  const [open, setOpen] = React.useState(false);
  const {  id,
    ime,
    rasa,
    pol,
    opis,
    visina,
    tezina,
    slika,
    vlasnikId} = props;


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

  const [obrisanPasFlag,setObrisanFlag] = useState(false);
  const handleBrisi = async()=>
  {
    setObrisanFlag(true);
  }
  
  useEffect(() => {
    async function fetchData() {
      const TOKEN = localStorage.getItem('token');
      await Axios.get('https://localhost:5001/Pas/vratiPseZaVlasnika?idVlasnika=' + logovan.id, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      })
      .then(async (res) => {
        if (res.data.length === 0) {
          // Ako nema podataka, postavite kartice koje se prikazuju na prazan niz
          postaviPseKojiSePrikazuju([]);
        } else {
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
  
          if ((results.length / brojObjavaPoStrani) % 1 !== 0) {
            postaviUkupanBrojStranica(
              Math.ceil(results.length / brojObjavaPoStrani)
            );
          } else {
            postaviUkupanBrojStranica(results.length / brojObjavaPoStrani);
          }
        }
        console.log(res.data + ' rezultat');
        console.log('Pas je obrisan:' + obrisanPasFlag);
      });
    }
    fetchData();
  }, [handleKorisnik, obrisanPasFlag]);
  

  console.log(obrisanPasFlag)
  const obrisiPsa = async ()=>
  {
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
     await Axios.delete('https://localhost:5001/Pas/obrisiPsa?id=' + id,
      {
        headers:
        {
          Authorization: `Bearer ${TOKEN}`
        }
      }).then(res=>
      {   
      // console.log(res);
      // handleBrisi();
      //  postaviPseKojiSePrikazuju([])
      //  handleCloseModal();
      window.location.reload(false)
    })
}

  const [izmena,setIzmena ] = useState(true)
  const handle=(e)=>
  {
      const newData={...data}
      newData[e.target.id]=e.target.value;
      setData(newData)
     console.log(newData)
  }
 
  const [data,setData]=useState({
    id:id,
      ime:ime,
      rasa:rasa,
      pol:pol,
      opis:opis,
      visina:visina,
      tezina:tezina,
      slika:slika,
      vlasnikId:logovan.id
    })
  const izmeniPsa = async()=>
  {
    console.log(data)
    const TOKEN=localStorage.getItem('token')
  
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    if(data.id==='' || data.ime==='' || data.rasa==='' || data.pol===''|| data.opis===''||data.visina==='' || data.tezina==='' || data.visina <=0 || data.visina>=200|| data.tezina<=0 || data.tezina>=100)
    {

      alert('Molimo Vas unesite validne informacija na formi za izmenu podataka o psu!')
      return
    }
    await  Axios.put('https://localhost:5001/Pas/azurirajPsa',
      {  id:data.id,
         ime:data.ime,
         rasa:data.rasa,
         pol:data.pol,
         opis:data.opis,
         visina:data.visina,
         tezina:data.tezina,
         slika:data.slika,
         vlasnikId:logovan.id
      },
      {
      
        headers:{ Authorization: `Bearer ${TOKEN}`}
      })
         .then(response=>
          {
              if(response.status==200)
              {   
                  console.log('Uspesna promena podataka')
                 console.log(response)
                 setData(response.data)
                 window.location.reload(false)
                 alert('Uspesno ste izmenili podatke o psu')
              }
  
          }).catch((error)=>
          {
            if(error.response.status)
            {
              alert(error.response.data)
            }
          })
  }

const[usluge,setUsluge]=useState([])
  useEffect(()=>
  {
    async function fetchData(){
    const TOKEN=localStorage.getItem('token')
    console.log('id psa je:' + id)
    await Axios.get('https://localhost:5001/Usluga/vratiUslugeVlasniku?idVlasnika=' + vlasnikId,
    { 
      headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(
    res=>
    {
      console.log(res)
      setUsluge(res.data)
    }
    )
    }
    fetchData();
    },[handleKorisnik])

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClosed = () => {
    setAnchorEl(null);
  };

  const Open = Boolean(anchorEl);
  const ID = open ? 'simple-popover' : undefined;
const handleIzmena=()=>
{
  const TOKEN=localStorage.getItem('token')
  if(token!=TOKEN || !TOKEN)
  {
    window.location.reload(false)
    return
  }
  setIzmena(!izmena)
}
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
    <>
    <div className={classes.container}>
      <div className='dugmici' style={{display:'grid'}}>
      <Button
        variant="contained"
        color="success"
        onClick={handleClickOpen}
        size="small"
      >
        Informacije o psu
      </Button>
      <Button variant='contained' color='error' size='small' onClick={handleOpenModal} >Obrisi psa</Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
           Da li zaiste zelite da obrisete Vaseg psa?
          </Typography>
          <Box sx={{display:'flex', justifyContent:'flex-end'}} >
                  <Button variant='contained'  color='error' onClick={()=>{obrisiPsa();}} sx={{marginRight:'10px'}}>Potvrdi</Button>
        <Button variant='outlined' color='info' onClick={handleCloseModal}  >Zatvori</Button>
          </Box>
        </Box>
      </Modal>
      <div>
    
    </div>
      </div>
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          sx={{display:'flex', justifyContent:'center'}}
          variant='h4'
        >
          Informacije o psu
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box className='izmena'>
          <Box  style={{display:'flex',marginBottom:'20px', justifyContent:'center'}} >
        <Button onClick = {() => { handleIzmena();}} variant='contained' style={{width:'200px',}}> Izmeni podatke </Button>
         </Box>
         <Grid container spacing={2} style={{display:'flex',justifyContent:'center',alignItems:'center',maxWidth:'300px'}}>
        <Grid item xs={6} >
          <Typography  ml={1} sx={{padding:'5px'}}>Ime: </Typography>
        </Grid>
        <Grid item xs={6}>
        <TextField  type='text' id='ime' value={data.ime} sx={{width:'250px',marginLeft:'25px'}} disabled={izmena} onChange={ (e) =>  handle(e) }/>
        </Grid>
         
        <Grid item xs={6}>
          <Typography  ml={1}  sx={{padding:'5px'}}>Rasa: </Typography>
          </Grid>
        <Grid item xs={6}>
          <TextField  type='text' id='rasa'value={data.rasa} sx={{width:'250px',marginLeft:'25px'}} disabled={izmena} onChange={ (e) =>  handle(e) }/>
          </Grid>

          <Grid item xs={6}>
          <Typography  ml={1}  sx={{padding:'5px'}}>Pol: </Typography>
          </Grid>
          <Grid item xs={6}>
          <TextField  type='text'id='pol' value={data.pol} sx={{width:'250px',marginLeft:'25px'}}disabled={izmena} onChange={ (e) => handle(e) }/>
          </Grid>

          <Grid item xs={6}>
          <Typography  ml={1} sx={{padding:'5px'}}>Opis:</Typography>
          </Grid>
          <Grid item xs={6}>
          <TextField  type='text' id='opis'value={data.opis} sx={{width:'250px',marginLeft:'25px'}}disabled={izmena} onChange={ (e) => handle(e) } />
          </Grid>


          <Grid item xs={6}>
          <Typography  ml={1}  sx={{padding:'5px'}}>Visina:</Typography>
          </Grid>
          <Grid item xs={6}>
          <TextField  type='number'id='visina' value={data.visina  } sx={{width:'250px',marginLeft:'25px'}}disabled={izmena} onChange={ (e) =>  handle(e) } />
          </Grid>

          <Grid item xs={6}>
          <Typography  ml={1}  sx={{padding:'5px'}}>Tezina: </Typography>
          </Grid>
          <Grid item xs={6}>
          <TextField  type='number'  id='tezina'value={data.tezina} sx={{width:'250px',marginLeft:'25px'}}disabled={izmena} onChange={ (e) =>  handle(e) } />
          </Grid>
        </Grid>
          <Box >
            <Box style={{display:'flex', justifyContent:'center'}} mt={3}>
          <Button variant='contained'  sx={{marginBottom:'20px',backgroundColor:'rgb(93, 224, 100)',width:'200px'}}onClick={()=>{handleIzmena();izmeniPsa();}}>Azuriraj podatke</Button>
          </Box>
        <CardSlika id={id}/>
        </Box>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} style={{ color: 'rgb(93, 224, 100)' }}>
            Zatvori
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
    </>
  );
}
