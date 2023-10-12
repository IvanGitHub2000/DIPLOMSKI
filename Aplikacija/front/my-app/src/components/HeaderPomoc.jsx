import * as React from 'react';
import Link from '@mui/material/Link';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
 import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import HelpIcon from '@mui/icons-material/Help';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import { useState, useEffect, useContext } from 'react'
import { profilVlasnikRoute,profilSitterRoute,DodajPsaRoute } from "../router/routes";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import { red } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import { CardHeader } from '@mui/material';
import { Home } from '@mui/icons-material';


const Search = styled('div')(({ theme }) => ({
 
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const NavBarPomoc=()=> {
  const[slika,setSlika]=useState('')
  const siterId=localStorage.getItem('idSitera')
  useEffect(()=>
  {
    Axios.get('https://localhost:5001/Siter/vratiSiteraPoId?id=' + siterId).then(res=>
    {
      console.log(res.data.slika + 'slik je')
      setSlika(res.data.slika)
    })
  })
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
    const log_out=()=>
    {
            const idVlasnika=localStorage.removeItem('idVlasnika')
            const token=localStorage.removeItem('token')
            const korisnik=localStorage.removeItem('korisnik')
            const idSitera=localStorage.removeItem('idSitera')
            console.log('Uspesno ste se log autovali')
            alert('Uspesno ste se odjavili')
  
    }
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
    <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      onClick={handleMobileMenuOpen}
      >
      <MenuItem    src={'https://localhost:5001/StaticFiles/' + slika} onClick={() => navigate(profilSitterRoute)}>Profil</MenuItem>
      <MenuItem onClick={()=>{handleMenuClose();log_out()}}>Odjavi se</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const novaSlika='https://localhost:5001/StaticFiles/' + slika
  console.log(novaSlika)
  const renderMobileMenu = (
      <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
          vertical: 'top',
        horizontal: 'right',
    }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
    
    >
      <MenuItem onClick={()=>{navigate('/registerRoute')}}>
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge color="error">
            <LogoutIcon />
       <Typography > Zapocni </Typography>
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={()=>{navigate('/helpRoute')}}>
        <IconButton
          size="large"
          // color="primary"
        >
          <Badge >
            <HelpIcon sx={{ color: "black" }} variant="outlined" />
       <Typography sx={{color:'black'}}> Pomoc </Typography>
          </Badge>
        </IconButton>
      </MenuItem>
     <MenuItem  onClick={()=>{navigate('/loginRoute')}}>
     <IconButton
       size="large"
       color="inherit"
     >
       <Badge color="error">
         <LoginIcon />
    <Typography > Prijavi se</Typography>
       </Badge>
     </IconButton>
   </MenuItem>
 <MenuItem onClick={()=>{navigate('/registerRoute')}}>
 <IconButton
   size="large"
   color="inherit"
 >
   <Badge color="error">
     <AppRegistrationIcon />
<Typography > Registruj se </Typography>
   </Badge>
 </IconButton>
</MenuItem>
</Menu>
  );
  const navigate=useNavigate();

  return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar  position='sticky' >
        <Toolbar  position='sticky'style={{backgroundColor:'#5de064'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            
            >
          </IconButton>
          <header
      id="header"
      className="fixed-top d-flex align-items-center header-transparent"
    >
        <div id="logo">
          <h1>
            <a href="./">PAWSOME</a>
          </h1>
        </div>
        </header>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <div className="container d-flex justify-content-between align-items-center">
        <nav xs={12} md={6}id="navbar" className="navbar">
          <ul>
            <li>
              <IconButton  onClick={()=>{navigate('/')}}>
              <Typography style={{color:'white'}} className="nav-link scrollto">
                O sajtu
              </Typography>
              </IconButton>
           </li>
            <li>
            <IconButton onClick={()=>{navigate('/')}}>
              <AddLocationAltIcon sx={{color:'white'}}/>
              <Typography fontSize={14} className="nav-link scrollto" href="#contact" style={{color:'white'}}>
                Kontakt
              </Typography>
              </IconButton>
            </li>
            <li>
            <IconButton  onClick={()=>{navigate('/helpRoute')}}>
              <HelpIcon sx={{color:'white'}}/>
              <Typography fontSize={14} className="nav-link scrollto" href="/helpRoute" style={{color:'white'}}>
                Pomoć
              </Typography>
              </IconButton>
            </li>
            <div className='upadaj' style={{display:'flex'}}>
             <li>
             <IconButton onClick={()=>{navigate('/loginRoute')}}>
              <Typography className="nav-link scrollto" href="/loginRoute" style={{color:'white',fontWeight:'bolder'}}>
                Prijavi se
              </Typography>
              </IconButton>
            </li>
            <li>
            <IconButton onClick={()=>{navigate('/registerRoute')}}>
              <Typography className="nav-link scrollto" href="/registerRoute"style={{color:'white',fontWeight:'bolder'}}>
                Registruj se
              </Typography>
              </IconButton>
            </li>
            </div>
          </ul>
          </nav>
          </div>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
export default NavBarPomoc

