import React from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import Grid from '@mui/material/Grid';
import CardDialog from './cardDialog';
import Header from '../../components/HeaderPomoc';
import HeaderAdmin from '../../components/HeaderAdmin';
import NavbarVlasnik from '../headerVlasnik';
import NavBarSiter from '../headerSiter';
import slika from '../../slike/dogHelp.jpg';
import { Box } from '@mui/material';
import Footer from '../../components/Footer';
import Typography from '@mui/material/Typography';

const Help = () => {
  const proveraSiter=localStorage.getItem('idSitera')
  const proveraVlasnik=localStorage.getItem('idVlasnika')
  const proveraAdmin=localStorage.getItem('idAdmina')
  return (
    <Box sx={{display:'flex',flexDirection:'column',flex:'1'}}>
    { proveraSiter ? <NavBarSiter/> : (proveraVlasnik ? <NavbarVlasnik/>  :(proveraAdmin ? <HeaderAdmin/> : <Header/>))} 
      <Grid sx={{
        display: 'flex',
        flexDirection: 'row'}}>
          <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center',marginBottom:'50px' }}> <img src={slika} alt="Dog Help" style={{ maxWidth: '70%',height:'auto' }} /> </Grid>
          <Grid sx={{display:'flex',flexDirection:'column',marginLeft:'100px',marginTop:'75px'}} > 
          <Typography variant="h2" sx={{display: 'flex',justifyContent: 'center',color: 'green'}}>Pawsome pomoć</Typography>
          <Typography variant="h3"  mt={3} sx={{ display: 'flex',justifyContent: 'center',color: 'green'}}> Odgovori na najčešća pitanja</Typography>
          </Grid>
       </Grid>
         <Box sx={{color: 'green', display: 'flex',flex: 1,marginLeft: '50px'}}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 4, md: 4 }} mb={5}>
           <Grid item xs={6}>
            <Box sx={{display: 'flex',flexDirection: 'row'}}>
              <PetsIcon />
              <CardDialog
                tekst={'Kako da postanem siter ili vlasnik psa?'}
                opis={
                  'Da bi na Pawsome sajtu postali siter ili vlasnik potrebno je da se registrujete, na taj način ste kreirali svoj nalog. Zatim, ukoliko ste siter čekate da Vas administrator prihvati i kada Vas prihvati mozete krenuti sa obavljanjem usluga, a ukoliko ste vlasnik mozete odmah krenuti sa nalazenjem sitera.'
                }
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{display: 'flex',flexDirection: 'row'}}>
              <PetsIcon />
              <CardDialog
                tekst={'Zašto bih trebao da postanem siter?'}
                opis={
                  'Ukoliko ste osoba koja voli pse i želi da bude u njihovom prisustvu, a da pritom nemate stalni radni odnos,na ovom sajtu možete zaraditi neki novac.'
                }
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{display: 'flex',flexDirection: 'row'}}>
              <PetsIcon />
              <CardDialog
                tekst={
                  'Kako da pošaljem zahtev siteru?'
                }
                opis={
                  'Ukoliko ste vlasnik i zelite da Vam siter čuva psa potrebno je odabrati siter-a po želji,a nakon toga je potrebno popuniti formu za zahteve i poslati je siter-u.'
                }
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <PetsIcon />
              <CardDialog
                tekst={'Kako mogu da komentarišem vlasnika ili sitera?'}
                opis={
                  'Posle (ne)uspesno zavrsene usluge siter ce obeleziti da je odredjena usluga gotova, kada siter obelezi da je zavrsio sa uslugom, siter moze komentarisati i ocenjivati psa, a takodje vlasnik moze komentarisati i ocenjivati siter-a. '
                }
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <PetsIcon />
              <CardDialog
                tekst={'Kako da izmenim sliku na svom profilu?'}
                opis={
                  'Kada se nalazite na stranici svog profila, klikom na dugme Dodaj sliku možete da odaberete sliku iz Vašeg računara.'
                }
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{display: 'flex',flexDirection: 'row'}}>
              <PetsIcon />
              <CardDialog
                tekst={'Kako da promenim podatke na svom profilu?'}
                opis={
                  'Kada se nalazite na stranici svog profila, klikom na dugme Izmeni podatke možete da izmenite podatke po želji.'
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer/>
    </Box>
  );
};
export default Help;