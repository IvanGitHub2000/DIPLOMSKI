
import { makeStyles } from '@material-ui/styles';
import { AlignHorizontalCenterTwoTone, AlignVerticalCenterSharp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const classStyles = makeStyles(
    {
        datepicker:
        {
           marginTop: '10px',
           marginBottom:'10px'
        },
        naslov:
        {
            justifyContent:'center',
            color:'rgb(93,224,100)'
        },
        slider:
        {
            marginLeft:'10px'
        },
        adresa:
        {
            display:'flex',
            width:'inherit',
            justifyContent:'space-evenly',
            marginTop: '10px',
            marginBottom:'10px'
        },
        usluga:
        {   display:'flex',
            flexDirection:'column',
            borderRadius:'30px',
            width:'650px',
            justifyContent:'center',
            alignItems:'center',
            marginBottom:'10px',
            marginTop:'10px'
        },
        vrsta:
        {
            display:'flex'
        },
        pikeri:
        {
            display:'flex',
            flexDirection: 'column',
        },
        main:
        {
            backgroundColor: 'rgb(234, 252, 220)',
            justifyContent:'center',
            display:'flex'
        },
        dugme:
        {
            display:'flex',
            marginTop: '10px',
            marginBottom:'10px',
            height:'70px',
          
        },
        selectbox:
        {
            display:'flex',
            marginTop: '10px',
            marginBottom:'10px',
            width:'inherit',
            justifyContent:'space-evenly'
        },
        napomena:
        {
            display:'flex',
            width:'inherit',
            justifyContent:'space-evenly',
            marginTop: '10px',
            marginBottom:'10px'
        }
        
       
    }
)
export default classStyles
