import React from 'react'; 
import { useState } from 'react';
import About from '../komponente/About';
import Recenzije from '../komponente/Recenzije';
import Usluge from '../komponente/Usluge';
import NadjiSittera from '../komponente/nadjisittera';
import PostaniSitter from '../komponente/postanisitter';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeaderAdmin from '../../components/HeaderAdmin';
import NavbarVlasnik from '../headerVlasnik';
import NavBarSiter from '../headerSiter';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Typography,Box } from '@mui/material';

export const Home = (props) => {
  const {korisnik}=props
  const navigate=useNavigate();
  // useEffect(()=>
  // {
  //   async function fetchData(){
  //   const TOKEN=localStorage.getItem('token')
  //  await Axios.get('https://localhost:5001/Auth/vratiTrenutnogKorisnika',
  //   {
  //     headers:{ Authorization: `Bearer ${TOKEN}`
  // }}).then(res=>
  //   {
  //      setLogovan(res.data)
  //      console.log(res.data)
  //   }).catch(err=>
  //     {
  //       if(err.response.status)
  //       {
  //         //  alert('Niste logovani')
  //       }
  //     })}
  //     fetchData();
  // },[])
  return (
        <Box className='wrapper'>
         { korisnik.tip==0 ? <NavbarVlasnik/>: (korisnik.tip==1 ?  <NavBarSiter/> :(korisnik.tip==2 ? <HeaderAdmin/> : <Header/>))} 
          <Box id="hero">
            <Box className="hero-container" data-aos="zoom-in" data-aos-delay="100">
              <Typography variant='h1'>Dobro došli na sajt PAWSOME</Typography>
              <Typography variant='h2'>Pravo mesto za vas i vašeg najboljeg prijatelja</Typography>
              {korisnik.tip==1?  <a href="#about"  hidden={true} className="btn-get-started">Zapocnite PAWSOME avanturu!</a> :
              (korisnik.tip==0 ?  <a href="#about" hidden={true} className="btn-get-started">Zapocnite PAWSOME avanturu!</a>  :
              (korisnik.tip==2?  <a href="#about" hidden={true} className="btn-get-started">Zapocnite PAWSOME avanturu!</a> : 
              <Button hidden={false} className="btn-get-started" onClick={()=>{navigate('/registerRoute')}}>
                Zapocnite PAWSOME avanturu!
                </Button> ))} 
            </Box>
          </Box>
          <Box id="main">
            <About/>
            <NadjiSittera/>
            <PostaniSitter/>
            <Recenzije/>
            <Usluge/>
          </Box>
        <Footer />
        </Box> 
    )
}
export default Home;