import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'; 
import { Box } from '@mui/material';

const About = () => {
  return (
    <Box id="about">
      <Container data-aos="fade-up">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} data-aos="fade-up">
            <Typography variant="h3" color="black" sx={{fontWeight:'bold'}} className="title">
              O sajtu
            </Typography>
            {/* <Grid xs={12} sm={6} md={12}> */}
            <Typography variant="h6" color="black" mt={3} mr={3}>
              Na ovom sajtu ćete naći različite usluge za Vaše najdraže ljubimce.
              Cilj sajta PAWSOME je da na lak i siguran način obezbedi čuvanje Vašeg kućnog ljubimca.
              Omogućuva razne pogodnosti koje će Vam olakšati brigu o psu kada niste u mogućnosti da brinete o njemu.
              PAWSOME će Vam pomoći da zaradite dodatne prihode, bez stalne obaveze.
              Sajt dalje pruža mogućnost komentarisanja i ocenjivanja sitera i pasa, kao pomoć pri odabiru sitera ili pasa.
            </Typography>
            {/* </Grid> */}
          </Grid>
          {/* Fleksibilni Grid item sa slikom xs je ispod 600px sirine, sm je od 600 do 900 px*/}
          <Grid item xs={12}  sm={6} >
            <img src="https://images.pexels.com/photos/357275/pexels-photo-357275.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Opis slike" style={{ width: '100%', height: 'auto', borderRadius: '20px' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
