import { makeStyles } from '@material-ui/styles';
import slika from '../../slike/slika6.jpg';
import { styled } from '@mui/material/styles';

const classStyles = makeStyles({
  container: {
    displey: 'flex',
    flexDirection: 'row',
    backgroundColor:'cornsilk'
  },
  naslov: {
    textAlign: 'center',
    color: 'green',
  },
  naslov2: {
    color: 'green',
  },
  slika: {
    displey: 'flex',
    flexDirection: 'column',
  },
  glavni: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap:'wrap',
    flex: 1,
    marginBottom:'50px'
  },
  paper: {
    display: 'flex',
    padding: 30,
  },
  tekst: {
    color: 'green',
  },
  divButton: {
    alignItems: 'center',
  },
  divButtonCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default classStyles;
