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
import classStyles from './styles';
import Opis from './components/opis';
import { useNavigate } from 'react-router-dom';
import { slikeUrl } from '../../../backendAddress';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PetsIcon from '@mui/icons-material/Pets';
import { Button } from '@mui/material';

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = classStyles();
  const navigate = useNavigate();

  const {
    ime,
    opis,
    slika,
    brojTelefona,
    grad,
    adresa,
    cenaPoSatu,
    dostupan,
    prosecnaOcena,
    id,
  } = props;

  return (
    <div className="kartica">
      <Card sx={{ width: 200, maxHeigh: 10 }} className={classes.kartica}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {ime[0]}
            </Avatar>
          }
          action={<PetsIcon style={{ color: 'green' }} />}
          title={ime}
        />
        <CardMedia
          component="img"
          height="130"
          // image={slika2}                           //OVA DVA NACINA SU ISTA
          // src={require('../../../slike/s1.jpg')}   //OVA DVA NACINA SU ISTA
          src={slikeUrl + slika}
          alt="Paella dish"
        />
        <CardContent>
          <Opis
            opis={opis}
            brojTelefona={brojTelefona}
            grad={grad}
            adresa={adresa}
            cenaPoSatu={cenaPoSatu}
            dostupan={dostupan}
            prosecnaOcena={prosecnaOcena}
            id={id}
          />
          <div>
            <Button
              style={{
                color: 'white',
                backgroundColor: 'rgb(93, 224, 100)',
                height: '32px',
                width:153
              }}
              value={id}
              onChange={e => e.target.value}
              onClick={() => {
                navigate('/vlasnikRoute',{state:id}); 
              }}
            >
              Odaberi sittera
            </Button>
          </div>
          Prosecna ocena : {prosecnaOcena}
          <br />
          Cena : {cenaPoSatu}
          <br />
          Grad: {grad}
        </CardContent>
      </Card>
    </div>
  );
}
