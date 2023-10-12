import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import DodajPsa from '../DodajPsa/index.jsx'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
import IkonicaHome from '../../components/ikonicaHome/index.jsx';
import { profilVlasnikRoute,DodajPsaRoute } from "../../router/routes.jsx";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react'
import Axios from 'axios'
import { red } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import { CardHeader } from '@mui/material';
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
const NavBarVlasnik=()=> {
  const[image,setimage]=useState('')
  const [isLogged,setLogged]=useState('')
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
       setLogged(res.data)
       console.log(res.data.id)
       setHandle1(!handle)
    })}
    fetchData();
  },[])

const ajdi=isLogged.id
useEffect(()=>
{
  async function fetchData(){
  
    const TOKEN=localStorage.getItem('token')
   await Axios.get('https://localhost:5001/Vlasnik/vratiVlasnikaPoId?id=' + ajdi,
    {
      headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(res=>
    {
      console.log(res.data.slika + 'slik je')
      setimage(res.data.slika)
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
    anchorEl={anchorEl}
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
      <MenuItem >
      <IconButton href='profilVlasnikRoute'>
      Profil
      </IconButton>
      </MenuItem>
      {/* <MenuItem onClick={() => navigate(DodajPsaRoute)}>Tvoji psi</MenuItem> */}
      <MenuItem onClick={()=>{handleMenuClose();log_out();navigate('/')}}>
      <IconButton onClick={()=>{handleMenuClose();log_out();navigate('/')}}>
    Odjavi se
      </IconButton>
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
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
    // onClick={handleMobileMenuOpen}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          >
      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={'https://localhost:5001/StaticFiles/'  + image}>
      </Avatar>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={()=>navigate(profilVlasnikRoute)}>
        <IconButton size="large" onClick={()=>navigate(profilVlasnikRoute)}color="inherit">
          <Badge >
            <AccountCircle />
        <Typography >Profil</Typography>
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem href="/sitterRoute">
        <IconButton size="large" href="/sitterRoute"color="inherit">
          <Badge >
            <SearchIcon />
        <Typography >Nadji sitera</Typography>
          </Badge>
        </IconButton>
      </MenuItem>
            <MenuItem>
            <IconButton size="large" href="/" color="inherit">
              <Badge >
             <LogoutIcon/>
                
             <Typography onClick={()=>{log_out();navigate('/')}}>Odjavi se</Typography>
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
            />
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
            <IconButton size="large" href="/" color="inherit">
            <Badge >
            <HomeIcon />
            </Badge>
            <Typography>Kuci</Typography>
            </IconButton>
            <IconButton size="large" href="/sitterRoute" color="inherit">
              <Badge >
                <SearchIcon />
              </Badge>
             <Typography >Nadji sitera</Typography>
            </IconButton>
            <IconButton size="large" href="/dodajPsaRoute" color="inherit">
              <Badge >
                <PetsIcon />
              </Badge>
             <Typography >Tvoji psi</Typography>
            </IconButton>          
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={'https://localhost:5001/StaticFiles/'  + image}>
              </Avatar>
            </IconButton>
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
export default NavBarVlasnik

