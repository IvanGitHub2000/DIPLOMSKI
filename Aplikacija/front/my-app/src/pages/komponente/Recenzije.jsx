import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const Recenzije = () => {
  return (
    <Box id="team">
      <Container data-aos="fade-up">
        <Grid sx={{display:'flex',justifyContent:'center'}}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }} color="black">
            Užitak za sve
          </Typography>
        </Grid>
        <Grid container spacing={2} mt={3}>
          <Grid item lg={4} md={6}>
            <Grid className="member" data-aos="fade-up" data-aos-delay="200">
              <Grid className="pic">
                <img
                  src="https://images.pexels.com/photos/5110844/pexels-photo-5110844.jpeg?auto=compress&cs=tinysrgb&w=600"
                  style={{borderRadius:'20px'}}
                />
              </Grid>
              <Typography variant="h4" color="black">Užitak za pse</Typography>
              <Typography variant="body1">
                Ljubimci će biti presrećni sa svojim siterima koji će se brinuti o njima i praviti im društvo.
              </Typography>
            </Grid>
          </Grid>

          <Grid item lg={4} md={6}>
            <Grid className="member" data-aos="fade-up" data-aos-delay="300">
              <Grid className="pic">
                <img src="https://images.pexels.com/photos/9632416/pexels-photo-9632416.jpeg?auto=compress&cs=tinysrgb&w=600"  style={{borderRadius:'20px'}}/>
              </Grid>
              <Typography variant="h4" color="black">Užitak za vlasnike pasa</Typography>
              <Typography variant="body1"> 
                Vlasnici pasa mogu biti u miru i spokoju znajući da su njihovi ljubimci na sigurnom.
              </Typography>
            </Grid>
          </Grid>

          <Grid item lg={4} md={6}>
            <Grid className="member" data-aos="fade-up" data-aos-delay="400">
              <Grid className="pic">
                <img src="https://images.pexels.com/photos/7516426/pexels-photo-7516426.jpeg?auto=compress&cs=tinysrgb&w=600" style={{borderRadius:'20px'}} />
              </Grid>
              <Typography variant="h4" color="black">Užitak za sitere</Typography>
              <Typography variant="body1" >
                Posle svakog dobro obavljenog posla siteri su bogatiji za još jednu novu avanturu i dobrog druženja sa psima.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Recenzije;
