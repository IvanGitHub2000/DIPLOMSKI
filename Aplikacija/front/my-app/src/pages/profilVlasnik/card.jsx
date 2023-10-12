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
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Axios from 'axios';
import classStyles from './styles';
import { useState,useEffect } from 'react';
import { ExpandMore } from '@mui/icons-material';
const CardSlika = (props) => {
  
  const {vlasnik}=props;
  const token=localStorage.getItem('token')
  const classes = classStyles();
  const[expanded,setExpanded]=useState('')
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const[slika,setSlika]=useState('')
  const [logovan,setLogovan]=useState('')
  const[handle,setHandle1]=useState('')
  useEffect(()=>
  {
    async function fetchData(){
    const TOKEN=localStorage.getItem('token')
    await Axios.get('https://localhost:5001/Auth/vratiTrenutnogKorisnika',
    {
      headers:{ Authorization: `Bearer ${TOKEN}`
    }}).then(res=>
    {
      setLogovan(res.data)
      console.log(res.data.id)
      setHandle1(!handle)
    })}
    fetchData();
  },[])

  useEffect(()=>
  {
    async function fetchData(){
    const TOKEN=localStorage.getItem('token')
    await Axios.get('https://localhost:5001/Vlasnik/vratiVlasnikaPoId?id=' + logovan.id,
      {
      headers:{ Authorization: `Bearer ${TOKEN}`}
       }).then(
      res=>
      {
        console.log(res.data.slika)
        setSlika(res.data.slika)
      }
    )}
    fetchData();
  },[handle])

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
  const handleSlika = async()=>
  {
    const TOKEN=localStorage.getItem('token')
    await Axios.get('https://localhost:5001/Vlasnik/vratiVlasnikaPoId?id=' + logovan.id,
    {
      headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(
      res=>
      {
        console.log(res.data.slika)
        setSlika(res.data.slika)
        window.location.reload(false)
      }
    )
  }
  const[Vlasnik,setVlasnik]=useState('')

  useEffect(()=>
  {
    async function fetchData(){
    const TOKEN=localStorage.getItem('token')
   await Axios.get('https://localhost:5001/Vlasnik/vratiVlasnikaPoId?id=' + logovan.id,
    {
      headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(
      res=>
      {
        console.log(res.data)
        setVlasnik(res.data)
      }
    )}
    fetchData();
  },[handle])
  
  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  const handleSubmit=async(event)=> {
    const TOKEN=localStorage.getItem('token')
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'responseType': 'blob',
          'Authorization': `Bearer ${TOKEN}`
        
      },
    };
    await Axios.post('https://localhost:5001/Vlasnik/dodajSlikuVlasniku?idVlasnik=' + vlasnik.id, formData, config).then((response) => {
    //    base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
    // srcValue = "data:image/png;base64,"+base64ImageString
    console.log(response);    
      setFile(response.data)
      handleSlika();
      setKlik(false)
    });
  }

  const[klik,setKlik]=useState(false)
  const handleClick=()=>
  {
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    setKlik(true)
    setExpanded(!expanded);
  }

  return (
    <Card
      // sx={{ maxWidth: 345 }}
      style={{
        display: 'grid',
        // marginBottom: '40px',
        marginTop: '40px',
        borderRadius: '50px',
        backgroundColor:'khaki'
      }}
    >   <div className='spoj' style={{display:'flex',justifyContent:'flex-start'}}>
        <CardHeader
          avatar={<Avatar style={{marginRight:'0px'}}sx={{ bgcolor: red[500] }} aria-label="recipe" src={'https://localhost:5001/StaticFiles/'  + slika}>  </Avatar>}
          title={'Ime i prezime:' + Vlasnik.ime + ' ' + Vlasnik.prezime}
          subheader={'Danasnji datum:' + date}
          >
          </CardHeader>
          </div>
      <CardMedia
        component="img"
        height="194"
        image={
          'https://localhost:5001/StaticFiles/' + slika
        }
      />
      <CardActions className={classes.divButtonCard}>
        <Typography style={{marginBottom:'20px'}}variant='h6'>Odaberite sliku</Typography>
          <input  style={{display:'flex',textAlignLast:'center'}}type="file" onClick={handleClick} onChange={handleChange} />
       <CardContent hidden={!klik}>
        <Button
          style={{
            backgroundColor: 'rgb(93, 224, 100)',
            color: 'black',
            width: '250px',
            height: '50px',
            borderRadius: '20px',
            color:'black'
          }}
          variant="contained"
          color="success"
          onClick={()=>{handleSubmit();}}
        >
          Potvrdi
        </Button>
        </CardContent>
      </CardActions>
    </Card>
  );
};
export default CardSlika;
