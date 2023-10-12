import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import { useState, useEffect, useContext } from 'react'
import IkonicaHome from '../../components/ikonicaHome';
import { profilVlasnikRoute,profilSitterRoute,DodajPsaRoute } from "../../router/routes";
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const NavBarSiter=()=> {

  const[slika,setSlika]=useState('')
  const [logovan,setLogovan]=useState('')
  const[handle,setHandle1]=useState('')
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
       setHandle1(!handle)
    })
  }
  fetchData()
  },[])

  useEffect(()=>
  {
    async function fetchData(){
    const TOKEN=localStorage.getItem('token')
    await Axios.get('https://localhost:5001/Siter/vratiSiteraPoId?id=' + logovan.id,
    {
      headers:{ Authorization: `Bearer ${TOKEN}`}
  }).then(res=>
    {
      console.log(res.data.slika + 'slik je')
      setSlika(res.data.slika)
    })}
    fetchData();
  },[handle])
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
      const token=localStorage.removeItem('token')
      console.log('Uspesno ste se log autovali')
      navigate('/')
      window.location.reload(false)
      alert('Successful log out')
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
      >
      <MenuItem    src={'https://localhost:5001/StaticFiles/' + slika} href='/sitterProfilRoute'>
        <IconButton href='/sitterProfilRoute'>
        Profil
        </IconButton>
        
        </MenuItem>
      <MenuItem onClick={()=>{handleMenuClose();log_out();navigate('/')}}>
       <IconButton>
        Odjavi se
       </IconButton>
        </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  // const novaSlika='https://localhost:5001/StaticFiles/' + slika
  // console.log(novaSlika)
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
    {/* onClick={handleProfileMenuOpen} -- stavi to posle +slika */}
      <MenuItem src={'https://localhost:5001/StaticFiles/' + slika}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          src={'https://localhost:5001/StaticFiles/' + slika}
          >
         {/* <AccountCircle src={'https://localhost:5001/StaticFiles/' + slika}/> */}
         {/* <img src={'https://localhost:5001/StaticFiles/' + slika}/> */}
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={'https://localhost:5001/StaticFiles/'  + slika}> 
          </Avatar>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={() => navigate(profilSitterRoute)}>
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge color="success">
            <AccountCircle />
       <Typography > Profil </Typography>
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={()=>{navigate('/sitterZahteviRoute')}} >
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge color="error">
            <NotificationsIcon />
       <Typography > Obavestenja </Typography>
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem href='./'onClick={()=>{handleMobileMenuClose();log_out();navigate('/')}}>
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge color="error">
            <LogoutIcon />
       <Typography > Odjavi se</Typography>
          </Badge>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  const navigate=useNavigate();
  return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar  style={{backgroundColor:'#5de064'}}>
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
            <IconButton size="large" color="inherit" href='/'>
              <Badge>
            <HomeIcon />
            </Badge>
            <Typography>Kuci</Typography>
          
             </IconButton>
            <IconButton
              size="larger"
              color="inherit"
              href='/sitterZahteviRoute' 
            >
              <Badge >
                <NotificationsIcon />
              </Badge>
              <Typography>Obavestenja</Typography>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              src={'https://localhost:5001/StaticFiles/' + slika}
            >
              {/* <AccountCircle src={'https://localhost:5001/StaticFiles/' + slika}/> */}
              {/* <img src={'https://localhost:5001/StaticFiles/' + slika}/> */}
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={'https://localhost:5001/StaticFiles/'  + slika}>  
          </Avatar>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {/* {console.log('jebi se')} */}
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              // src={'https://localhost:5001/StaticFiles/' + slika}
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
export default NavBarSiter
