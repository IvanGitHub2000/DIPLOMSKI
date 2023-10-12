import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import Kartica from './kartice/index.jsx';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import IkonicaHome from '../../components/ikonicaHome';
import { vratiSveSitereUrl, filtrirajSitere } from '../../backendAddress';
import Gradovi from '../sitter/gradovi';
import Footer from '../../components/Footer'
import CenaPoSatu from './cenaPoSatu';
import ProsecnaOcena from '../sitter/prosecnaOcena';
import BrojeviStranica from '../sitter/broj';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Grid, IconButton } from '@mui/material';
import NavBarVlasnik from '../headerVlasnik';
import Typography from '@mui/material/Typography';
import Axios from 'axios'
import { useRef } from 'react';
const Sitter = (props) => {
  const navigate = useNavigate();
  const{siter}=props;
  const classes = classStyles();
  const [siteri, postaviSitere] = useState([]);
  const [siteriKojiSePrikazuju, postaviSitereKojiSePrikazuju] = useState([]);
  const [stranica, postaviStranicu] = useState(1);
  const [ukupanBrojStranica, postaviUkupanBrojStranica] = useState(1);
  const [brojObjavaPoStrani, postaviBrojObjavaPoStrani] = useState(5);
  const [grad, postaviGrad] = useState('');
  const [Ocena, postaviOcenu] = useState('');
  const [cenaOd, postaviCenuOd] = useState('');
  const [cenaDo, postaviCenuDo] = useState('');
  const [logovan,setLogovan]=useState('')
  const[handle,setHandle1]=useState('')
  const token=localStorage.getItem('token')
  const [flagReset,setFlagReset] = useState(false);
  useEffect(()=>
  {
    async function vrati(){
    const TOKEN=localStorage.getItem('token')
    await Axios.get('https://localhost:5001/Auth/vratiTrenutnogKorisnika',
    {
      headers:{ Authorization: `Bearer ${TOKEN}`
  }}).then(res=>
    {
       setLogovan(res.data)
       console.log(res.data.id)
       setHandle1(!handle)
    })}
    vrati()
  },[])
  useEffect(() => {
    const TOKEN=localStorage.getItem('token')
    fetch(filtrirajSitere,
      {
        headers:{Authorization: `Bearer ${TOKEN}`}
      }).then(async res => {
      const results = await res.json();
      postaviSitere(results);

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
      postaviSitereKojiSePrikazuju(objave);

      if ((results.length / brojObjavaPoStrani) % 1 != 0) {
        //check if number have decimal places, example: 23 % 1 = 0, 23.5 % 1 = 0.5
        postaviUkupanBrojStranica(
          Math.ceil(results.length / brojObjavaPoStrani)
        );
      } else {
        postaviUkupanBrojStranica(results.length / brojObjavaPoStrani);
      }
    });
  }, [flagReset]);

  useEffect(() => {
    const objave = [];
    const start = brojObjavaPoStrani * (stranica - 1);
    if (siteri.length > start + brojObjavaPoStrani) {
      for (let i = start; i < start + brojObjavaPoStrani; i++) {
        objave.push(siteri[i]);
      }
    } else {
      for (let i = start; i < siteri.length; i++) {
        objave.push(siteri[i]);
      }
    }
    postaviSitereKojiSePrikazuju(objave);
  }, [stranica]);

  const buttonPotvrdiOnCLick = () => {
    const city = grad != 'sve' ? grad : ' ';
    console.log(city);
    const TOKEN=localStorage.getItem('token')
    fetch(
      'https://localhost:5001/Siter/filterSiteri?grad=' +
        city +
        '&minCena=' +
        cenaOd +
        '&maxCena=' +
        cenaDo +
        '&minOcena=' +
        Ocena
    ,
    {
      headers:{Authorization:`Bearer ${TOKEN}`}
    }).then(async res => {
      const results = await res.json();

      postaviSitere(results);

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
      postaviSitereKojiSePrikazuju(objave);

      if ((results.length / brojObjavaPoStrani) % 1 != 0) {
        //check if number have decimal places, example: 23 % 1 = 0, 23.5 % 1 = 0.5
        postaviUkupanBrojStranica(
          Math.ceil(results.length / brojObjavaPoStrani)
        );
      } else {
        postaviUkupanBrojStranica(results.length / brojObjavaPoStrani);
      }
    });

  };

  const buttonhandleReset = async()=>
  {
    postaviGrad("")
    postaviCenuDo("")
    postaviCenuOd("")
    setFlagReset(!flagReset)
    postaviOcenu("")
    
  }
  return (
    <Box className={classes.container}>
      <NavBarVlasnik />
      <Box className={classes.divSearch}>
        <Gradovi grad={grad} postaviGrad={postaviGrad} />
        <CenaPoSatu cenaOd={cenaOd} cenaDo={cenaDo} naziv="Cena od" setValues={postaviCenuOd} reset={flagReset}  />
        <CenaPoSatu cenaOd={cenaOd} cenaDo={cenaDo} naziv="Cena do" setValues={postaviCenuDo} reset={flagReset} />
        <ProsecnaOcena Ocena={Ocena} postaviOcenu={postaviOcenu} />
        <Grid sx={{display:'flex'}} ml={5}>
        <Button
          className={classes.buttonPotvrdi}
          style={{ backgroundColor: 'rgb(252, 4, 4)', margin: 15 }}
          variant="contained"
          color="warning"
          onClick={()=>{buttonhandleReset();}}
          >
          Resetuj
        </Button>
        <Button
          className={classes.buttonPotvrdi}
          style={{ backgroundColor: 'rgb(93, 224, 100)', margin: 15 }}
          variant="contained"
          color="success"
          onClick={buttonPotvrdiOnCLick}
          >
          Potvrdi
        </Button>
          </Grid>
      </Box>
      <div className={classes.miniContainer}>
        {/* {users.map((user, index) => <Kartica ime={user.ime} opis={user.opis} key={index } />)}   */}
        {siteriKojiSePrikazuju.length > 0 ? (
         siteriKojiSePrikazuju.map((siter, index) => (
          <Kartica
            ime={siter.ime}
            opis={siter.bio}
            slika={siter.slika}
            brojTelefona={siter.brojTelefona}
            grad={siter.grad}
            adresa={siter.adresa}
            cenaPoSatu={siter.cenaPoSatu}
            dostupan={siter.dostupan}
            prosecnaOcena={siter.prosecnaOcena}
            key={index}
            id={siter.id}
          />
            ))
            ) : (
             <Typography variant='h2'>Ne postoje takvi siteri</Typography>
              )}
      </div>
      <Box className={classes.pagination}>
        <BrojeviStranica
          ukupanBrojStranica={ukupanBrojStranica}
          postaviStranicu={postaviStranicu}
        />
      </Box>
      {/* <Footer/> */}
    </Box>
  );
};

export default Sitter;
