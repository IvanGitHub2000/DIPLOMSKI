import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Ocene from '../ocene/index.jsx';
import classStyles from './styles.jsx';
import Opis from './components/opis/index.jsx';
import { slikeUrl } from '../../../backendAddress.js';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PetsIcon from '@mui/icons-material/Pets';
import { useState,useEffect } from 'react';
import Axios from 'axios';

const ExpandMore = styled(props => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);
 
  const classes = classStyles();
  const {
    id,
    ime,
    rasa,
    pol,
    opis,
    visina,
    tezina,
    slika,
    vlasnikId
  } = props;
  const[slikaPsa,setSlikaPsa]=useState('')

      useEffect(()=>
      {
        async function fetchData(){
        const TOKEN=localStorage.getItem('token')
        await Axios.get('https://localhost:5001/Pas/vratiPsaPoId?idPas=' + id,{
        
            headers:{ Authorization: `Bearer ${TOKEN}`}
          
        }).then(
          res=>
          {
            console.log(res.data.slika)
            setSlikaPsa(res.data.slika)
          }
        )}
      fetchData();
      })
  return (
    <>
        <Card sx={{ width: 200, height:600 }} className={classes.kartica}>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={'https://localhost:5001/StaticFiles/' + slikaPsa}>
          {ime[0]}
          </Avatar>
        }
        action={<PetsIcon style={{ color: 'rgb(93, 224, 100)' }} />}
        title={ime}
        />
      <CardMedia
        component="img"
        height="130"
        // image={slika2}                           //OVA DVA NACINA SU ISTA
        // src={require('../../../slike/s1.jpg')}   //OVA DVA NACINA SU ISTA
        // src={slikeUrl + slika}
        src={'https://localhost:5001/StaticFiles/' + slikaPsa}
        />
        <CardContent>
        <Opis
         id={id}
         ime={ime}
         rasa={rasa}
         pol={pol}
         opis={opis}
         visina={visina}
         tezina={tezina}
         slika={slika}
         vlasnikId={vlasnikId}
         />
      </CardContent>
    </Card>
    </>
  );
}
