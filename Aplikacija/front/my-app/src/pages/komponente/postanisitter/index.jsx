import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { registerRoute } from "../../../router/routes";
import { CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const PostaniSitter = () => {
  const navigate = useNavigate();
  return (
    <Box id="about">
      <Container data-aos="fade-up">
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12} data-aos="fade-up">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }} mr={3}>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }} color="black" className="title" >
                Želiš da postaneš siter?
              </Typography>
              <Typography variant="h6" color="black" mt={3} mb={3} >
                Ukoliko si osoba koja voli pse i koja želi da bude u njihovom prisustvu, a pri tom i zaradi novac, ne traži dalje, na pravom si mestu!
              </Typography>
              <Button
                variant="contained"
                onClick={() => { navigate(registerRoute) }}
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
              >
                Postani siter
              </Button>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}  className="d-flex justify-content-center align-items-stretch position-relative" data-aos="fade-up">
            <CardContent>
              <img
                style={{ height: 'auto', width: '100%', borderRadius: '20px' }}
                src="https://images.pexels.com/photos/2449533/pexels-photo-2449533.jpeg?auto=compress&cs=tinysrgb&w=600"
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
export default PostaniSitter;
