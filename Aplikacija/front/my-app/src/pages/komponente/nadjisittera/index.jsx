import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { registerRoute } from '../../../router/routes';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const NadjiSittera = () => {
  const navigate = useNavigate();
  return (
    <Box id="about">
      <Container data-aos="fade-up">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} data-aos="fade-up">
            <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} mr={3}>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }} color="black" className="title" >
                Potreban Vam je siter?
              </Typography>
              <Typography variant="h6" color="black" mt={3} mb={3} >
                Pronađite nekog ko će se brinuti o Vašem psu, na način na koji se Vi brinete o njemu.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor:"#00FA9A",
                  color: "white",
                  borderColor: "#00FA9A",
                  borderRadius: "50px",
                  width: "300px",
                  height: "75px",
                  "&:hover": {
                    backgroundColor: "#00FA9A",
                    color: "white",
                    borderColor: "green",
                  },
                }}
                onClick={() => navigate(registerRoute)}
              >
                Nađi sitera
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} data-aos="fade-up">
            <CardContent>
              <img
                style={{ height: 'auto', width: '100%', borderRadius: '20px' }}
                src="https://images.pexels.com/photos/1378849/pexels-photo-1378849.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Opis slike"
                class="glightbox play-btn mb-4"
              />
            </CardContent>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NadjiSittera;
