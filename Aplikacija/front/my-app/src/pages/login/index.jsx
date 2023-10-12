import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Header from '../../components/HeaderPomoc';
import Footer from '../../components/Footer';
import slika from '../../slike/aaa.jpg';

import Box from '@mui/material/Box';
import { Grid } from '@mui/material/Grid';
import NavbarVlasnik from '../headerVlasnik';
import NavBarSiter from '../headerSiter';
import { Typography } from '@mui/material';
const Login = () => {
  const [korisnik,setKorisnik]=useState(false)
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const validateEmail = email => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validatePwd = pass => {
    return pass.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    );
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      alert('Niste uneli validan email!');
      return;
    }

    if (!validatePwd(pwd)) {
      alert(
        'Niste uneli validnu sifru. Sifra mora da sadrzi: 1 malo slovo, 1 veliko slovo, 1 broj i mora da bude najmanje duzine 8'
      );
      return;
    }

    const DTO = {
      email: email,
      password: pwd,
    };

    fetch('https://localhost:5001/Auth/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(DTO),
    })
      .then(async res => {
        if (res.ok) {
          res = await res.json();
          localStorage.setItem('token', res.token);
          setKorisnik(true)
          alert('Uspesno ste se ulogovali!');

        }
        else if(res.status==401)
        {
          alert('Uneli ste losu sifru!!!')
        }
        else if(res.status==501)
        {
          alert('Niste jos prihvaceni od strane admina!!!')
        }
      })
      .catch(err => {
       alert(err.response.data)
        
      });
 
  };
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const proveraSiter=localStorage.getItem('idSitera')
  const proveraVlasnik=localStorage.getItem('idVlasnika')
  const handleNewLogin = async()=>
  {
    navigate('/');
    window.location.reload();
  }
  return (
    <>
    {korisnik? handleNewLogin(): 
    (
    <Box >
      { proveraSiter ? <NavBarSiter/> : (proveraVlasnik ? <NavbarVlasnik/> : <Header/>)} 
    <Box sx={{display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url(${slika})`,
    backgroundPosition: 'center',
    flex: 1,}}>
      <Box sx={{ displey: 'flex', flexDirection: 'column',minHeight:'675px' }}>
        <Typography variant='h2' sx={{ color: '#000000c2'}} mt={5}>
          Logovanje
        </Typography>
          <Box sx={{
             display: 'flex',
            flexDirection: 'column',
            flex: 1,
            marginTop: '100px'}}>
            <TextField
              label="Email"
              type="text"
              variant="outlined"
              autoComplete="off"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
              style={{ marginBottom: '20px', backgroundColor: 'white' }}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Potvrdite lozinku
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                style={{ marginBottom: '20px', backgroundColor: 'white' }}
                label="Lozinka"
                type={values.showPassword ? 'text' : 'password'}
                variant="outlined"
                onChange={e => setPwd(e.target.value)}
                value={pwd}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flex: 0.3,}}>
            <Button
              style={{ backgroundColor: 'green' }}
              variant="contained"
              color="success"
              onClick={handleLogin}
            >
              Uloguj se
            </Button>

            <Button
              style={{ backgroundColor: 'green' }}
              variant="contained"
              color="success"
              onClick={()=>{navigate('/')}}
            >
              Nazad
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>)}
    </>
  );
};
export default Login;
