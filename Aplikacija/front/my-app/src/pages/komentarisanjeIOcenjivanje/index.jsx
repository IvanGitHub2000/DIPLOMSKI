import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import Kartice from '../komentarisanjeIOcenjivanje/kartice/index.jsx';
import { vratiSveSitereUrl } from '../../backendAddress';
import { useLocation, useNavigate } from 'react-router-dom';
import { sitterRoute } from '../../router/routes';
import { Button } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Footer from '../../components/Footer.js'
import PojedinacnaKartica from '../komentarisanjeIOcenjivanje/pojedinacnaKartica/index.jsx';
import HeaderVlasnik from '../headerVlasnik/index.jsx'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
const KomentarisanjeIOcenjivanje = props => {

  const location=useLocation();
  console.log(location.state)
  const classes = classStyles();
  const navigate = useNavigate();
  
  const{komentar}=props;
  const [siter, postaviSitera] = useState([]);
  useEffect(() => {
   async function vrati()
    {
      const TOKEN=localStorage.getItem('token')
       await fetch('https://localhost:5001/Siter/vratiSiteraPoId?id=' + location.state,
      {
        headers:{ Authorization: `Bearer ${TOKEN}`
      }}).then(siter=>{
                    siter.json().then(siter=>postaviSitera(siter))
                  })
    }
      vrati();
    }, []);

  const [komentari, postaviKomentar] = useState([]);

  useEffect(() => {
    const TOKEN=localStorage.getItem('token')
    fetch(
      'https://localhost:5001/Recenzija/vratiRecenzijeZaSitera?id=' + location.state,
      {
    headers:{ Authorization: `Bearer ${TOKEN}`}
      }
    ).then(async res => {
      const recenzijeSvihSitera = await res.json();

      const recenzije = recenzijeSvihSitera.filter(
        recenzijaSitera => recenzijaSitera.siterId == location.state
      );
      postaviKomentar(recenzije);
    });
  }, []);

  return (<>
    <div  style={{minHeight:'752px',backgroundColor:'#95e36e61'}}>
      <HeaderVlasnik />
    <div className={classes.container}>
      <div className={classes.divGore}>
        <div className={classes.naziv}>
          <h4 className={classes.divImeIPrezime}>
            {
              <Avatar
                className={classes.sapica}
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
              >
                <PetsIcon style={{ color: 'white' }} />
              </Avatar>
            }
            {siter.ime + ' ' + siter.prezime + ' '}
          </h4>
          <h5 className={classes.divProsecnaOcena}>
            {' '}
            Prosecna ocena: {siter.prosecnaOcena}
          </h5>
        </div>
        <div className={classes.divButton}>
          <Button
            style={{
              backgroundColor: 'rgb(93, 224, 100)',
              color: 'white',
              marginRight: ' 100px',
            }}
            onClick={() => {
              navigate(sitterRoute);
            }}
          >
            Vrati se nazad
          </Button>
        </div>
      </div>

      <div className={classes.miniContainer}>
        {/* <PojedinacnaKartica /> */}
        {komentari.map((k, index) => {
          return (
            <Kartice
              vreme={k.vreme}
              komentar={k.komentar}
              ocena={k.ocena}
              key={index}
              vlasnikId={k.vlasnikId}
              comment={komentar}
            />
          );
        })}
      </div>
    </div>
    </div>
  
    </>
  );
};
export default KomentarisanjeIOcenjivanje;
