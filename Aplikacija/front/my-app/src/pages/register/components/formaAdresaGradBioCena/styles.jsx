import { makeStyles } from '@material-ui/styles';

const classStyles = makeStyles({
  paper: {
    padding: 20,
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  kontrole: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default classStyles;
