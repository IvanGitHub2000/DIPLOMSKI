import React, { useEffect, useState } from 'react';
import slika from '../../slike/aaa.jpg';

import Box from '@mui/material/Box';
import { Grid } from '@mui/material/Grid';
import FormaTipKorisnika from './components/formaTipKorisnika';
import FormaImePrezBrTelefona from './components/formaImePrezBrTel';
import FormaUsernameEmailSifra from './components/formaUsernameEmailSIfra';
import FormaAdresaGradBioCena from './components/formaAdresaGradBioCena';
import FormaZavrsiRegistraciju from './components/formaZavrsiRegistraciju';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/HeaderPomoc';
import Footer from '../../components/Footer';

import NavbarVlasnik from '../headerVlasnik';
import NavBarSiter from '../headerSiter';
const Registracija = () => {
  const navigate = useNavigate();
  const [formNumber, setFormNumber] = useState(0);

  //FormaTipKorisnika
  const [siter, setSiter] = useState(true); //true siter, false vlasnik

  //FormaImePrezBrTel
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [brojTelefona, setBrojTelefona] = useState('');

  //FormaUsernameEmailSifra
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [matchPwd, setMatchPwd] = useState('');
  const [email, setEmail] = useState('');

  //FormaAdresaGradBioCena
  const [adresa, setAdresa] = useState('');
  const [grad, setGrad] = useState('');
  const [bio, setBio] = useState('');
  const [cenaPoSatu, setCenaPoSatu] = useState(0);

  const [zavrsiRegistraciju, setZavrsiRegistraciju] = useState(false);

  useEffect(() => {
    if (zavrsiRegistraciju) {
      let DTO = {
        ime: firstName,
        prezime: lastName,
        email: email,
        korisnickoIme: userName,
        sifra: pwd,
        brojTelefona: brojTelefona,
        grad: grad,
        adresa: adresa,
      };

      if (siter) {
        DTO = {
          ...DTO,
          bio: bio,
          cenaPoSatu: cenaPoSatu,
        };
      }

      const urlSiter = 'https://localhost:5001/Siter/dodajSitera';
      const urlVlasnik = 'https://localhost:5001/Vlasnik/dodajVlasnika';
      fetch(siter ? urlSiter : urlVlasnik, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(DTO),
      }).then(async response => {
        if (response.ok) {
          const res = await response.json();
          navigate('/');
        } else {
          const res = await response.text();
          setZavrsiRegistraciju(false);
          alert(res);
        }
      });
    }
  }, [zavrsiRegistraciju]);
  const proveraSiter = localStorage.getItem('idSitera');
  const proveraVlasnik = localStorage.getItem('idVlasnika');
  return (
    <Box className="jedanregister">
      {proveraSiter ? (
        <NavBarSiter />
      ) : proveraVlasnik ? (
        <NavbarVlasnik />
      ) : (
        <Header />
      )}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${slika})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // backgroundColor: '#D5F4C8',
        flex: 1,
        alignItems: 'center',}}>
        <div style={{ minHeight: '675px' }} sx={{  
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginLeft: '300px',}}>
          <h1 style={{ color: '#000000c2', marginTop: 20 }}>Registracija</h1>
          {formNumber == 0 ? (
            <FormaTipKorisnika
              setFormNumber={setFormNumber}
              formNumber={formNumber}
              setSiter={setSiter}
            />
          ) : null}
          {formNumber == 1 ? (
            <FormaImePrezBrTelefona
              formNumber={formNumber}
              setFormNumber={setFormNumber}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              brojTelefona={brojTelefona}
              setBrojTelefona={setBrojTelefona}
            />
          ) : null}
          {formNumber == 2 ? (
            <FormaUsernameEmailSifra
              formNumber={formNumber}
              setFormNumber={setFormNumber}
              userName={userName}
              setUserName={setUserName}
              pwd={pwd}
              setPwd={setPwd}
              matchPwd={matchPwd}
              setMatchPwd={setMatchPwd}
              email={email}
              setEmail={setEmail}
            />
          ) : null}
          {formNumber == 3 ? (
            <FormaAdresaGradBioCena
              formNumber={formNumber}
              setFormNumber={setFormNumber}
              bio={bio}
              setBio={setBio}
              cenaPoSatu={cenaPoSatu}
              setCenaPoSatu={setCenaPoSatu}
              adresa={adresa}
              setAdresa={setAdresa}
              grad={grad}
              setGrad={setGrad}
              siter={siter}
            />
          ) : null}
          {formNumber == 4 ? (
            <FormaZavrsiRegistraciju
              setFormNumber={setFormNumber}
              formNumber={formNumber}
              setZavrsiRegistraciju={setZavrsiRegistraciju}
              zavrsiRegistraciju={zavrsiRegistraciju}
              siter={siter}
            />
          ) : null}
        </div>
      </Box>
    </Box>
  );
};

export default Registracija;
