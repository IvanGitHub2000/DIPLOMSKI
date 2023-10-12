 import * as React from 'react';
 import { styled } from '@mui/material/styles';
 import Card from '@mui/material/Card';
 import CardHeader from '@mui/material/CardHeader';
 import CardMedia from '@mui/material/CardMedia';
 import CardContent from '@mui/material/CardContent';
 import CardActions from '@mui/material/CardActions';
 import Collapse from '@mui/material/Collapse';
 import Avatar from '@mui/material/Avatar';
 import IconButton, { IconButtonProps } from '@mui/material/IconButton';
 import Typography from '@mui/material/Typography';
 import { red } from '@mui/material/colors';
 import FavoriteIcon from '@mui/icons-material/Favorite';
 import ShareIcon from '@mui/icons-material/Share';
 import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 import MoreVertIcon from '@mui/icons-material/MoreVert';
 import Button from '@mui/material/Button';
 import slika from '../../slike/dog.jpg';
 import classStyles from './styles';
 import Axios from 'axios'
 import { ExpandMore, Grade } from '@mui/icons-material';
 import { useState,useEffect } from 'react';
import { Alert, Grid, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CardSlika=(props) =>{
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
const { id }=props
const token=localStorage.getItem('token')
const [file, setFile] = useState()

function handleChange(event) {
  setFile(event.target.files[0])
}

const[expanded,setExpanded]=useState('')
const handleExpandClick = () => {
  setExpanded(!expanded);
};
const handleSubmit=async(event)=> {
  const TOKEN=localStorage.getItem('token')
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', file.name);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'responseType': 'blob' ,
      'Authorization': `Bearer ${TOKEN}`
    },
  };
  await Axios.post('https://localhost:5001/Pas/dodajSlikuPsu?idPas=' + id, formData, config).then((response) => {
  console.log(response);
    setFile(response.data)
    window.location.reload(false)
  }).catch(err=>
    {
      if(err.response.status)
      {
        alert(err.response.data)
      }
    });
}
const [pic,setPic]=useState('')

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
      setPic(res.data.slika)
    }
  )}
  fetchData();
})
    const classes = classStyles();
    const[hide,setHide]=useState(false)

    const handleHide=()=>
    {
      const TOKEN=localStorage.getItem('token')
      if(token!=TOKEN || !TOKEN)
      {
        window.location.reload(false)
        return
      }
      setHide(!hide)
    }
   return(
    <>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Promenite sliku psu</h2>
          <p id="parent-modal-description">
            Da li zaista zelite da promenite sliku psu?
          </p>
          <Grid sx={{display:'flex',justifyContent:'flex-end'}}>
          <Button variant='contained' color='success' onClick={handleSubmit} sx={{marginRight:'10px'}}>Promeni</Button>
          <Button variant='outlined' color='error' onClick={handleClose}>Zatvori</Button>
          </Grid>
        </Box>
      </Modal>
    </div>
     <Card sx={{ maxWidth: 200 }}style={{display:'initial'}}>
       <CardActions className={classes.divButtonCard}> 
       <div className='dodajslikupas' style={{display:'grid'}}>
        <Typography style={{textAlign:'center',marginBottom:'15px'}}variant='h6'>Odaberite sliku</Typography>
        <input onClick={()=>{handleHide();handleOpen();}} style={{marginLeft:'100px'}} type="file" onChange={handleChange} />
            </div>
        </CardActions>
     </Card>
            </>
   );
 }
export default CardSlika