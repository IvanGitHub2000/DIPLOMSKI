import React from "react";
import { Container, Grid, Typography,Box } from "@mui/material"; 

const Usluge = () => {
  return (
    <Box id="services">
      <Container data-aos="fade-up">
        <Grid sx={{display:'flex',justifyContent:'center' }} mb={5} color="black">
          <Typography variant="h3" sx={{ fontWeight:'bold' }}>
            Usluge
          </Typography>
        </Grid>
        <Grid container spacing={2} justifyContent="center" mt={3}>
          <Grid item lg={6} md={6} data-aos="zoom-in">
            <Grid className="box">
              <Grid className="icon" href='registerRoute'>
                <i class="fa-solid fa-dog"></i>
              </Grid>
              <Typography variant="h4" color="black" className="title">
                Šetanje psa po gradu
              </Typography>
              <Typography variant="body2" className="description">
                Vaši psi će obožavati duge šetnje sa našim siterima i ubrzo će Vam tražiti da ih naši siteri ponovo šetaju.
              </Typography>
            </Grid>
          </Grid>

          <Grid item lg={6} md={6} data-aos="zoom-in">
            <Grid className="box">
              <Grid className="icon">
                <i class="fa-solid fa-house"></i>
              </Grid>
              <Typography variant="h4" color="black" className="title">
                Čuvanje psa u vašoj kući
              </Typography>
              <Typography variant="body2" className="description">
                Ukoliko niste kod kuće, a niste u mogućnosti da povedete Vašeg voljenog ljubimca sa sobom, onda ste na pravom mestu. Naši siteri će se pobrinuti o Vašem ljubimcu.
              </Typography>
            </Grid>
          </Grid>

          <Grid item lg={6} md={6} data-aos="zoom-in">
            <Grid className="box">
              <Grid className="icon">
                <i class="fa-solid fa-bone"></i>
              </Grid>
              <Typography variant="h4" color="black" className="title">
                Poseta sitera
              </Typography>
              <Typography variant="body2" className="description">
                Ukoliko je Vaš pas nabacio višak kilograma, a ne želite da ga vodite na šetnje, ovo je prava vrsta usluge za Vas. Naši siteri će doći na vašu kućnu adresu sa različitim igračkama i lopticama za Vašeg psa i nateraće malog nevaljalca na malo fizičke aktivnosti u Vašem dvorištu.
              </Typography>
            </Grid>
          </Grid>

          <Grid item lg={6} md={6} data-aos="zoom-in">
            <Grid className="box">
              <Grid className="icon">
                <i class="fa-solid fa-bowl-food"></i>
              </Grid>
              <Typography variant="h4" color="black" className="title">
                Čuvanje psa u kući sitera
              </Typography>
              <Typography variant="body2" className="description">
                Ukoliko Vam je potreban Vaš kućni prostor za neki događaj, a pritom će Vam pas praviti probleme, odaberite kada Vam odgovara da naš siter pokupi vašeg psa i odvede ga kod svoje kuće na čuvanje.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Usluge;
