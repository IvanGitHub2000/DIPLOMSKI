
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../pages/login/index.jsx';
import Registracija from '../pages/register/index.jsx';
import Home from '../pages/home/index.jsx';
import Sitter from '../pages/sitter/index.jsx';
import KomentariasnjeIOcenjivanje from '../pages/komentarisanjeIOcenjivanje/index.jsx';
import Vlasnik from '../pages/vlasnik/index.jsx';
import ProfilVlasnik from '../pages/profilVlasnik/index.jsx';
import DodajPsa from '../pages/DodajPsa/index.jsx';
import Help from '../pages/help/index.jsx';
import Admin from '../pages/admin/index.jsx';
import React from 'react';

import { Alert } from '@mui/material';
import { useState,useEffect } from 'react';
import PristigliZahtevi from '../pages/sitterPristigliZahtevi/index.jsx';
import VlasnikZahtevi from '../pages/vlasnikZahtevi/index.jsx';
import SitterProfil from '../pages/sitterProfil/index.jsx';
import AdminVlasnici from '../pages/adminVlasnici/index.jsx';
import Axios from 'axios';
import * as routes from './routes.jsx';

import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Box';
import NotFound from './NotFound.jsx';

const Router = () => {

  const [isLogged,setLoged]=useState('')
  const[handle,setHandle1]=useState('')
  const[isLoading,setLoading]=useState(true)
  const TOKEN=localStorage.getItem('token')
  useEffect(()=>
  {
    async function fetchData(){
    setLoading(true)
    await Axios.get('https://localhost:5001/Auth/vratiTrenutnogKorisnika',
    {
     
      headers:{ Authorization: `Bearer ${TOKEN}`
    }}).then(res=>
    {
       setLoged(res.data)
       setLoading(false)
    }).catch(err=>
      {
      setLoading(false)
      })}
      fetchData();
},[]);

if(isLoading)
{
return <Grid style={{display:'flex',justifyContent:'center',width:'100%',height:'100vh',alignItems:'center'}}>
<CircularProgress/>
</Grid>
}
else
  return (
    <>
    <BrowserRouter>
        <Routes>
       {/* <Route element={<ProtectedRouteLogovanTrue user={logovan} />}>
       </Route> */}
       <Route exact path={routes.loginRoute} element={isLogged ? <Navigate to={'/'}/>:<Login />} />
       <Route exact path={routes.registerRoute} element={isLogged ? <Navigate to={'/'}/>:<Registracija />} />
       <Route exact path={routes.helpRoute} element={isLogged ? <Navigate to={'/'}/>: <Help />} />
  

      <Route exact path={routes.adminRoute}  element={  isLogged?.tip===2 ? <Admin /> :
      <Navigate to={'/'}/>
        }  />
      <Route exact path={routes.DodajPsaRoute} element={ isLogged?.tip===0 ? <DodajPsa doggy={isLogged}/> :
      <Navigate to={'/'}/>}  />
      <Route
          exact
          path={routes.profilVlasnikRoute}
          element={ isLogged?.tip===0 ? <ProfilVlasnik logged={isLogged} /> : 
          <Navigate to={'/'}/> }
        />
        <Route exact path={routes.sitterRoute}
         element={
          isLogged?.tip===0 ? 
           <Sitter siter={isLogged}/>:
           <Navigate to={'/'}/>} />
        <Route exact path="/" element={<Home korisnik={isLogged} />} />
        <Route
          exact
          path={routes.adminVlasniciRoute}
          element={isLogged?.tip===2  ?<AdminVlasnici /> :
          <Navigate to={'/'}/>}
        />
        
        <Route
          exact
          path={routes.komentarisanjeIOcenjivanjeRoute}
          element={
            isLogged?.tip===0 ?
            <KomentariasnjeIOcenjivanje komentar={isLogged}/>:
            <Navigate to={'/'}/>}
        />
        <Route exact path={routes.vlasnikRoute} element={  isLogged?.tip===0 ? <Vlasnik vlasnik={isLogged} />: 
          <Navigate to={'/'}/>} />
        <Route exact path ={routes.profilSitterRoute} element={  isLogged?.tip===1 ?<SitterProfil user={isLogged}/>:
         <Navigate to={'/'}/>}/>
          <Route exact path ={routes.pristigliZahteviRoute} element={isLogged?.tip===1 ? <PristigliZahtevi pristigli={isLogged}/>:
         <Navigate to={'/'}/>}/>
          <Route exact path ={routes.pristigliZahteviVlasnikRoute} element={isLogged?.tip===1 ? <VlasnikZahtevi/>:
         <Navigate to={'/'}/>}/>
           <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default Router;
