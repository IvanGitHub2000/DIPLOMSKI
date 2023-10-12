import { makeStyles } from '@material-ui/styles';
import slika from '../../slike/dog.jpg';
const classStyles = makeStyles({
  container: {
    backgroundColor: 'cornsilk',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  miniContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flex: 1,
    alignItems: 'center',
  },

  divSearch: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },

  buttonPotvrdi: {
    display: 'flex',
    margin: '15px',
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
  glavni:{
    display: 'flex',
    flexDirection: 'row', 
    justifyContent:'space-evenly' ,
    flex:1          
},
grid:{
   display: 'flex',
   flexDirection: 'column' ,
   flex: 0.4 , 
   padding: 30    
}, 
fab:{
  
},
dodajPsa:{
  display:'grid',
  justifyContent:'center'
}
});
export default classStyles;
