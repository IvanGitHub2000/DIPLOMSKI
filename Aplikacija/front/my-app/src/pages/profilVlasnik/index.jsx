
import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import NavBar from '../headerVlasnik';
import PetsIcon from '@mui/icons-material/Pets';
import DeleteIcon from '@mui/icons-material/Delete';
import CardSlika from './card';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Axios from 'axios';
import TextField from '../../components/TextField';
import { ButtonGroup } from '@mui/material';
import axios from '../../api/axios';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import Footer from '../../components/Footer'
import { Refresh } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';
import Card from '@mui/material/Card';
const ProfilVlasnik =(props)=>{

const {logged}=props;
const [logovan,setLogovan]=useState('')
const[handle,setHandle1]=useState('')
const[tokencic,setToken]=useState('false')

const token=localStorage.getItem('token')


  // useEffect(()=>
  // {
  //   async function fetchData(){
  //   const TOKEN=localStorage.getItem('token')
  //   await Axios.get('https://localhost:5001/Auth/vratiTrenutnogKorisnika',
  //   {
  //     headers:{ Authorization: `Bearer ${TOKEN}`
  // }}).then(res=>
  //   {
  //      setLogovan(res.data)
  //      console.log(res.data.id)
  //      setHandle1(!handle)
  //     //  window.location.reload(false)
  //     //  setToken(!tokencic)
  //   }).catch(err=>
  //     {
  //       // window.location.reload(false)
  //     })}
  //     fetchData();
  // },[])
  
  // useEffect(()=>
  // {
  //   const TOKEN=localStorage.getItem('token')
  //   Axios.get('https://localhost:5001/Auth/vratiTrenutnogKorisnika',
  //   {
  //     headers:{ Authorization: `Bearer ${TOKEN}`
  // }}).then(res=>
  //   {
  //      setLogovan(res.data)
  //      console.log(res.data.id)
       
  //   }).catch(err=>
  //     {
  //       return <Navigate to={'/'}/>
  //     })
  // },[tokencic])

    const[ch,setCh]=useState(true)
    const handleCh=()=>
    {
      const TOKEN=localStorage.getItem('token')
      if(token!=TOKEN || !TOKEN)
      {
        window.location.reload(false)
        return
      }
      setCh(!ch)
    }

    const classes = classStyles();
    
    const [prihvaceni,setPrihvaceni]=useState([])
    const [neprihvaceni,setNeprihvaceni]=useState([])
    const [pending,setPending]=useState([])
    const[gotovi,setGotovi]=useState([])

    const [otvoriPrihvaceni,setOtvoriPrihvaceni]=useState(false)
    const [otvoriNeprihvaceni,setOtvoriNeprihvaceni]=useState(false)
    const [otvoriPending,setOtvoriPending]=useState(false)
    const [otvoriGotovi,setOtvoriGotovi]=useState(false)


    const handlePrihvaceni=()=>
    {
        setOtvoriPrihvaceni(!otvoriPrihvaceni)
    }
    const handleNeprihvaceni=()=>
    {
      setOtvoriNeprihvaceni(!otvoriNeprihvaceni)
    }
    const handlePending=()=>
    {
      setOtvoriPending(!otvoriPending)
    }
    const handleGotovi=()=>
    {
      setOtvoriGotovi(!otvoriGotovi)
    }

    const prihvaceni_zahtevi=async()=>
    {
      const TOKEN=localStorage.getItem('token')
      if(token!=TOKEN || !TOKEN)
      {
        window.location.reload(false)
        return
      }
          await Axios.get('https://localhost:5001/Usluga/vratiUslugeVlasnikuPoStatusuSaPsom?idVlasnika='  + logged.id + '&status=1',
            {
              headers:{ Authorization: `Bearer ${TOKEN}`}
            }).then(
                res=>
                {
                  res.data.forEach(x=>
                    {
                      console.log(x.pas.ime)
                    })
                  const provera= res.data + 'nista'
                    if(provera==='nista')
                {
                      alert('Trenutno nema prihvacenih zahteva.Budite strpljivi!')
                }
                    setPrihvaceni(res.data)
                }
            ).catch(err=>
              {
                if(err.response.status)
                {
                  alert(err.response.data)
                }
                window.location.reload(false)
              }
              )
    }
    const odbijeni_zahtevi=async()=>
    {
      const TOKEN=localStorage.getItem('token')
      if(token!=TOKEN || !TOKEN)
      {
        window.location.reload(false)
        return
      }
      await Axios.get('https://localhost:5001/Usluga/vratiUslugeVlasnikuPoStatusuSaPsom?idVlasnika=' + logged.id + '&status=2',
      {
        headers:{ Authorization: `Bearer ${TOKEN}`}
      }).then(
                res=>
                {
                  res.data.forEach(x=>
                    {
                      console.log(x.pas.ime)
                    })
                  const provera= res.data + 'nista'
                    if(provera==='nista')
                {
                      alert('Trenutno nema Vasih zahteva koje je siter odbio.')
                }
                    setNeprihvaceni(res.data)
                }
            ).catch(err=>
              {
                if(err.response.status)
                {
                  alert(err.response.data)
                }
              }
              )
    }

    const date = new Date();
    date.setHours(0)
    {console.log(
      date.toLocaleDateString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    );}

    const pending_zahtevi=async()=>
    {
      const TOKEN=localStorage.getItem('token')
      if(token!=TOKEN || !TOKEN)
      {
        window.location.reload(false)
        return
      }
      await Axios.get('https://localhost:5001/Usluga/vratiUslugeVlasnikuPoStatusuSaPsom?idVlasnika=' + logged.id + '&status=0',
      { headers:{ Authorization: `Bearer ${TOKEN}`
      }}).then(res=>
              {
                res.data.forEach(x=>
                  {
                    console.log(x.pas.ime)
                  })
                  
                  const provera= res.data + 'nista'
                    if(provera==='nista')
                {
                      alert('Siter jos uvek nije ocenio Vaseg psa.Molimo Vas budite strpljivi, cim oceni Vaseg psa bicete u mogucnosti da ocenite sitera.')
                }
                setPending(res.data)
              }
            )
    }

  const gotovi_zahtevi=async()=>
  {
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
  await Axios.get('https://localhost:5001/Usluga/vratiUslugeVlasnikuPoStatusuSaPsom?idVlasnika=' + logged.id +'&status=3',
    {
    headers:{ Authorization: `Bearer ${TOKEN}`
  }}).then(
              res=>
              { 
              res.data.forEach(x=>
                {
                  console.log(x.pas.ime)
                })
                
                const provera= res.data + 'nista'
                  if(provera==='nista')
              {
                    alert('Siter jos uvek nije ocenio Vaseg psa.Molimo Vas budite strpljivi, cim oceni Vaseg psa bicete u mogucnosti da ocenite sitera.')
              }
                  setGotovi(res.data)            
              }
          ).catch((error)=>
          {
            if(error.response.status)
            alert(error.response.data)
          })
  }
  const buttons = [
    <Button style={{borderTopLeftRadius:'20px',borderBottomLeftRadius:'20px'}}key="one" onClick={()=>{prihvaceni_zahtevi();handlePrihvaceni();}}>Prihvaceni</Button>,
    <Button key="two"onClick={()=>{odbijeni_zahtevi();handleNeprihvaceni();}}>Odbijeni</Button>,
    <Button key="three" onClick={()=>{pending_zahtevi();handlePending();}}>Na cekanju</Button>,
    <Button style={{borderTopRightRadius:'20px', borderBottomRightRadius:'20px'}}key="four"onClick={()=>{gotovi_zahtevi();handleGotovi();}}>Gotovi</Button>,
  ];

  const [komentar,setKomentar]=useState('');
  const [ocena,setOcena]=useState('');

  const oceni =async(id,siterId,pasId,komentar,ocena)=>
  { 
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    if(komentar==='' || ocena <=0 || ocena >5 || ocena ==='' )
    {
      alert('Molimo Vas lepo popunite formu')
      return
    }
    let vlasnikId=logged.id
    await Axios.post('https://localhost:5001/Recenzija/dodajRecenzijuSiteru',
    {
      vlasnikId,
      siterId,
      pasId,
      komentar,
      ocena
    },
    {
      headers:{Authorization:`Bearer ${TOKEN}`}
    }).then(res=>{
        console.log(res.data)
        alert('Uspesno ste podelili Vase misljenje o izvrsenoj usluzi i ocenili siter-a!')
        brisi_uslugu(id)
        window.location.reload(false)
      }).catch((error)=>
      {
        if(error.response.status)
        {
          alert(error.response.data)
        }
        else
        {
          alert('Greska!')
        }
      })
  }

  const [profil,setProfil]=useState([])
  const [data,setData]=useState(
    {
        id:0,
        ime:'',
        prezime:'',
        email:'',
        korisnickoIme:'',
        sifra:'',
        brojTelefona:'',
        grad:'',
        adresa:'',
    })
  const izmeni_ime=async()=>
  {
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    if(logged.id==='')
    {
      alert('Greska!!!')
    }
    if(profil.ime==='')
    {
      alert('Polje ime ne sme biti prazno!')
      return
    }
    if(profil.ime.length>20)
    {
      alert('Duzina imena ne sme biti duze od 20 karaktera!')
      return
    }
    await Axios.put('https://localhost:5001/Vlasnik/azurirajVlasnika',
      {
        id:logged.id,
        ime:profil.ime 
      },
      {
        headers:{ Authorization: `Bearer ${TOKEN}`}
      }).then(res=>
        {
          console.log(res + 'zasto')
          setProfil(res.data)
          setData(res.data)
          window.location.reload(false)
          })
  }

  const izmeni_prezime=async()=>
  {
      const TOKEN=localStorage.getItem('token')
      if(token!=TOKEN || !TOKEN)
      {
          window.location.reload(false)
          return
      }
      if(logged.id==='')
      {
      alert('Greska!!!')
      }
      if(profil.prezime==='')
      {
        alert('Polje prezime ne sme biti prazno!')
        return
      }
      if(profil.prezime.length>30)
      {
          alert('Duzina prezimena ne sme biti duze od 30 karaktera!')
          return
      }
      await Axios.put('https://localhost:5001/Vlasnik/azurirajVlasnika',
        {
          id:logged.id,
        
          prezime:profil.prezime
    
        },{
        headers:{ Authorization: `Bearer ${TOKEN}`}
      }).then(res=>
          {
            console.log(res + 'zasto')
            setProfil(res.data)
            setData(res.data)
            window.location.reload(false)
            })
    }

    const izmeni_korisnicko_ime=async()=>
    {
      const TOKEN=localStorage.getItem('token')
      if(token!=TOKEN || !TOKEN)
      {
        window.location.reload(false)
        return
      }
      if(logged.id==='')
      {
      alert('Greska!!!')
      }
        if(profil.korisnickoIme==='')
        { 
      const TOKEN=localStorage.getItem('token')
      alert('Polje korisnicko ime ne sme biti prazno!!!')
        return
      }
        await Axios.put('https://localhost:5001/Vlasnik/azurirajVlasnika',
        {
          id:logged.id,                    
          korisnickoIme:profil.korisnickoIme,
        },{
        headers:{ Authorization: `Bearer ${TOKEN}`}
        }).then(res=>
        {
        setProfil(res.data)
          setData(res.data)
          window.location.reload(false)
        }).catch((error)=>
          {
          if(error.response.status)
          {
          alert(error.response.data)
          }
    })
    }

  const [pwd, setPwd] = useState('');
  const validatePwd = pass => {
    return pass.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    );
  };
  const handleSifra=()=>
  {
  if (!validatePwd(pwd)) {
    alert(
      'Niste uneli validnu sifru. Sifra mora da sadrzi: 1 malo slovo, 1 veliko slovo, 1 broj i mora da bude najmanje duzine 8'
    );
    return;
  }
  }

  const izmeni_sifru=async()=>
  {
    const TOKEN=localStorage.getItem('token')
    if(logged.id==='')
      {
        alert('Greska!!!')
      }
    if(profil.sifra==='')
    {
      alert('Polje sifra ne sme biti prazno!!!')
      return
    }
    if(profil.sifra.length>=20)
    {
      alert('Polje sifra ne sme imati vise od 20 karaktera!!!')
      return
    }
      await Axios.put('https://localhost:5001/Vlasnik/azurirajVlasnika',
      {
        id:logged.id,                         
        sifra:profil.sifra                            
    
      }, { headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(res=>
        {
            console.log(res + 'zasto')
            setProfil(res.data)
            setData(res.data)
            alert('Uspesno ste izmenili sifru!')
            window.location.reload(false)
          })
    }

  const izmeni_broj_telefona=async()=>
  { 
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
      {
        window.location.reload(false)
        return
      }
      if(logged.id==='')
      {
        alert('Greska!!!')
        }
      if(profil.brojTelefona==='')
      {
        alert('Polje broj telefona ne sme biti prazno!!!')
        return
      }           
      await Axios.put('https://localhost:5001/Vlasnik/azurirajVlasnika',
        {
          id:logged.id,                            
          brojTelefona:profil.brojTelefona,                                                           
        },{
        headers:{ Authorization: `Bearer ${TOKEN}`}
      }).then(res=>
        {
          console.log(res + 'zasto')
          setProfil(res.data)
          setData(res.data)
          window.location.reload(false)
          })
    }

  const izmeni_grad=async()=>
  { 
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    if(logged.id==='')
    {
    alert('Greska!!!')
      }
    if(profil.grad==='')
      {
          alert('Polje grad ne sme biti prazno!!!')
            return
              }
      await Axios.put('https://localhost:5001/Vlasnik/azurirajVlasnika',
      {
        id:logged.id,                               
        grad:profil.grad
      },{
        headers:{ Authorization: `Bearer ${TOKEN}`}
      }).then(res=>
        {
          console.log(res + 'zasto')
          setProfil(res.data)
          setData(res.data)
          window.location.reload(false)
        })
    }
          
  const izmeni_adresu=async()=>
  { 
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    if(logged.id==='')
    {
      alert('Greska!!!')
      }
    if(profil.adresa==='')
      {
          alert('Polje adresa ne sme biti prazno!!!')
        return
      }
      await Axios.put('https://localhost:5001/Vlasnik/azurirajVlasnika',
      {
        id:logged.id,                             
        adresa:profil.adresa                                      
      },{
      headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(res=>
      {
        setProfil(res.data)
        setData(res.data)
        window.location.reload(false) 
      })
  }

  const[refresh,setRefresh]=useState(false)

    useEffect(()=>
  {
    async function fetch(){
    const TOKEN=localStorage.getItem('token')
    await Axios.get('https://localhost:5001/Vlasnik/vratiVlasnikaPoId?id=' + logged.id,
    {
  
        headers:{ Authorization: `Bearer ${TOKEN}`
  }}).then(res=>
          {
            console.log(res)
            setProfil(res.data)
            setData(res.data)
          }
      )}
      fetch()
    },[handle])

    let pasId=[]

    const[stanje,setStanje]=useState(-1)
    const[skrij,setSkrij]=useState(false)
    const handleklik=()=>
    {
      setSkrij(!skrij)
    }
    const brisi_uslugu=async(props)=>
    { 
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    await Axios.delete('https://localhost:5001/Usluga/obrisiUslugu?idUsluge=' + props,
      {
        headers:{ Authorization: `Bearer ${TOKEN}`}
      }).then(
        res=>
        { 
          console.log(res.data + 'AHAHHAAH BRISANO')
          window.location.reload(false)
        }
        )
    }


// const [j,setJ]=useState(false)
// const handlej=()=>
// {
//   setJ(!j)
// }
const [x,setX]=useState(false)
const handlex=()=>
{
  setX(!x)
}
// const [y,setY]=useState(false)
// const handley=()=>
// {
//   setY(!y)
// }
// const [z,setZ]=useState(false)
// const handlez=()=>
// {
//   setZ(!z)
// }
  let PocetakDatumPrihvaceni=null
  let PocetakVremePrihvaceni=null
  let PocetakDatumOdbijeni=null
  let PocetakVremeOdbijeni=null
  let PocetakDatumPending=null
  let PocetakVremePending=null

      return(
        <>
           <div className={classes.container}>
           <NavBar />
             <div className={classes.glavni}>  
             <CardSlika vlasnik={logged}/>            
             <Card className={classes.paper} elevation={8}style={{display:'grid',backgroundColor:'khaki',minWidth:'475px',marginTop:'40px',borderRadius:'50px'}}>
            <div >            
            <div style={{display:'grid',justifyContent:'center'}}>           
          </div>
          <div className='obavestenje'>
            <Typography variant='h6'style={{textAlign:'center'}}>Obavestenja o uslugama</Typography>
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                  m: 1,
                },
              }}
              >   
          <ButtonGroup size="medium" aria-label="large button group" >
              {buttons}
            </ButtonGroup>
          </Box>
        <div  style={{display:'grid'}}   >

      {prihvaceni && prihvaceni.map((x,indexPrihvaceni)=>

            (<div className='prihvaceni' hidden={otvoriPrihvaceni}style={{borderRadius:'10px',backgroundColor:'cornsilk',maxHeight:'100px',maxWidth:'500px',padding:'10px'}}>
            <h6 hidden={true}>{PocetakDatumPrihvaceni= new Date(x.pocetak).toLocaleDateString()}</h6>
          <h6 hidden={true}>{ PocetakVremePrihvaceni= new Date(x.pocetak).toLocaleTimeString(['hr-HR'],{hour:'2-digit',minute:'2-digit'})}</h6>
          
          <h6 hidden={true}>{pasId=x.pasId}</h6>
              <Typography>Siter je prihvatio Vas zahtev za uslugu {x.vrsta == 0 ? <a> setanje psa</a>:
              x.vrsta == 1?<a> cuvanje psa u kuci vlasnika</a>:
              x.vrsta==2 ? <a> poseta sitera</a>:<a> cuvanje psa u kuci sitera</a>} za vaseg psa {x.pas.ime}!
              Spremite se, siter dolazi {PocetakDatumPrihvaceni}  u  {PocetakVremePrihvaceni}. </Typography>               
                  <Button onClick={()=>{brisi_uslugu(x.id);}}>Brisi</Button>
                </div>))}

        {neprihvaceni && neprihvaceni.map((l,indexNeprihvaceni)=>
          (   <div className='neprihvaceni' hidden={otvoriNeprihvaceni}style={{borderRadius:'10px',backgroundColor:'cornsilk',maxHeight:'100px',maxWidth:'500px',padding:'10px'}}>
              <h6 hidden={true}>{PocetakDatumOdbijeni= new Date(l.pocetak).toLocaleDateString()}</h6>
            <h6 hidden={true}>{ PocetakVremeOdbijeni= new Date(l.pocetak).toLocaleTimeString(['hr-HR'],{hour:'2-digit',minute:'2-digit'})}</h6>
            <Typography>Siter {l.siter.ime} {l.siter.prezime} je nazalost odbio uslugu 
            {x.vrsta == 0 ? <a> setanje psa</a>:
                x.vrsta == 1?<a> cuvanje psa u kuci vlasnika</a>:
                x.vrsta==2 ? <a> poseta sitera</a>:<a> cuvanje psa u kuci sitera</a>} 
                      , datuma {PocetakDatumOdbijeni} u {PocetakVremeOdbijeni} za Vaseg psa {l.pas.ime}.Molimo Vas ne dajte da Vas ovo obeshrabri, vec potrazite novog sitera!</Typography>
              <Button onClick={()=>{brisi_uslugu(l.id);}}>Brisi</Button>  
        </div>
          ))
        }

      {pending && pending.map((k,indexPending)=>
      (  <div className='pending' hidden={otvoriPending} style={{borderRadius:'10px',backgroundColor:'cornsilk',maxHeight:'100px',maxWidth:'500px',padding:'10px'}}>
          <h6 hidden={true}>{PocetakDatumPending= new Date(k.pocetak).toLocaleDateString()}</h6>
          <h6 hidden={true}>{ PocetakVremePending= new Date(k.pocetak).toLocaleTimeString(['hr-HR'],{hour:'2-digit',minute:'2-digit'})}</h6>
      <Typography>Molimo Vas budite strpljivi siter {k.siter.ime} {k.siter.prezime} jos uvek nije video Vasu uslugu 
      {k.vrsta == 0 ? <a> setanje psa</a>:
              k.vrsta == 1?<a> cuvanje psa u kuci vlasnika</a>:
              k.vrsta==2 ? <a> poseta sitera</a>:<a> cuvanje psa u kuci sitera</a>} za psa {k.pas.ime} datuma {PocetakDatumPending} u {PocetakVremePending}. </Typography>
      <Button onClick={()=>{brisi_uslugu(k.id);}}>Brisi</Button>
      </div>
        ))}
        
      {gotovi && gotovi.map((g,index)=>
      (  <div key={g.id} className='gotovi' hidden={otvoriGotovi} style={{borderRadius:'10px',backgroundColor:'cornsilk',maxHeight:'500px',maxWidth:'500px',padding:'10px'}}>
            <h6 hidden={true}>{pasId=g.pasId} {}  {}</h6>
          <Typography>Vasa usluga {g.vrsta == 0 ? <a> setanje psa</a>:
              g.vrsta == 1?<a> cuvanje psa u kuci vlasnika</a>:
              g.vrsta==2 ? <a> poseta sitera</a>:<a> cuvanje psa u kuci sitera</a>} za psa:{g.pas.ime} je obavljena od strane sitera {g.siter.ime} {g.siter.prezime}  </Typography>
              <Typography style={{marginBottom:'20px',marginTop:'10px'}}>Molimo vas odvojite bar sekundi i ocenite sitera! </Typography>
          <div className='sakrij' hidden={skrij}>
            <TextField     
                required
                id="outlined-required"
                label="Komentari"
                multiline
                value={stanje===index ? komentar: ' '}
                defaultValue="Hello World"
                onClick={(e)=>{setKomentar('');setOcena(0);setStanje(index);}}
                onChange={ (e) => { setKomentar(e.target.value)}}  
                />
              <TextField   
                id="outlined-number"
                label="Ocena"
                type="number"
                value={stanje===index ? ocena: 0}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ inputProps: { min: 1, max: 5} }}
                onClick={(e)=>{setOcena(0);setStanje(index);}}
                onChange={ (e) =>  { setOcena(e.target.value)}}                
                />
              <Button color='primary' onClick={()=>{oceni(g.id,g.siterId,g.pasId,komentar,ocena);gotovi_zahtevi();}}>Posalji ocenu siteru</Button>
              </div>
            </div>
              ))}
            </div>
            </div>
            </div>
            </Card>
             <Card  elevation={8} style={{display:'flex',backgroundColor:'khaki',flexDirection:'column',padding:'20px',width:'500px',marginTop:'40px',borderRadius:'50px'}}>
             <h3 style={{textAlign:'center',color:'black'}} className={classes.naslov2}>Opšti podaci</h3>
             <Grid container style={{display:'flex'}}>
              <Grid container spacing={1} sx={{display:'flex', justifyContent:'space-around',alignItems:'center',margin:'2px'}}>
                <Grid item xs={2}>
                    <label >Ime:</label>
                </Grid>
                <Grid item>
                    <input type='text'  value={profil.ime}style={{borderRadius:'10px'}}  onChange={ (e) =>  setProfil((profil)=>({...profil,ime:e.target.value})) }disabled={ch}></input>
                </Grid>
                  <Button onClick={()=>{izmeni_ime();}}startIcon={<EditIcon/>}> Izmeni </Button>
              </Grid>
              <Grid container spacing={1} sx={{display:'flex', justifyContent:'space-around',alignItems:'center',margin:'2px'}}>
                <Grid item xs={2}>
                      <label style={{}}>Prezime:</label>
                </Grid>
                <Grid item>
                <input type='text' style={{borderRadius:'10px'}} value={profil.prezime} onChange={ (e) =>  setProfil((profil)=>({...profil,prezime:e.target.value})) }  disabled={ch}></input>
                </Grid>         
                  <Button onClick={()=>{izmeni_prezime();}}startIcon={<EditIcon/>}> Izmeni</Button>
              </Grid>
              <Grid container spacing={1} sx={{display:'flex', justifyContent:'space-around',alignItems:'center',margin:'2px'}}>
                  <Grid item xs={2}>
                        <label style={{}}>Korisničko Ime:</label>
                </Grid> 
                <Grid item >
                <input type='text' style={{borderRadius:'10px'}}  value={profil.korisnickoIme} onChange={ (e) =>  setProfil((profil)=>({...profil,korisnickoIme:e.target.value})) }disabled={ch}></input>
                </Grid>
                  <Button startIcon={<EditIcon/>}onClick={()=>{izmeni_korisnicko_ime();}}> Izmeni </Button>
              </Grid>
              <Grid container spacing={1} sx={{display:'flex', justifyContent:'space-around',alignItems:'center',margin:'2px'}}>
                <Grid item xs={2}>
                      <label style={{}}>Sifra:</label>
                </Grid>
                <Grid item >
                <input type='password'  style={{borderRadius:'10px'}}   onChange={ (e) =>  setProfil((profil)=>({...profil,sifra:e.target.value})) }disabled={ch}></input>
                </Grid>
                  <Button startIcon={<EditIcon/>}onClick={()=>{izmeni_sifru();}}> Izmeni</Button>
              </Grid>
              <Grid container spacing={1} sx={{display:'flex', justifyContent:'space-around',alignItems:'center',margin:'2px'}}>
             <Grid item xs={2}>
                   <label style={{}}>Broj telefona:</label>
             </Grid>
             <Grid item >
             <input type='text'style={{borderRadius:'10px'}}  value={profil.brojTelefona} onChange={ (e) =>  setProfil((profil)=>({...profil,brojTelefona:e.target.value})) } disabled={ch}></input>
             </Grid> 
              <Button startIcon={<EditIcon/>}onClick={()=>{izmeni_broj_telefona();}}> Izmeni </Button>
              </Grid>
              <Grid container spacing={1} sx={{display:'flex', justifyContent:'space-around',alignItems:'center',margin:'2px'}}>
                <Grid item xs={2}>
                      <label style={{}}>Grad:</label>
                </Grid>
                <Grid item >
                <input type='text'  style={{borderRadius:'10px'}} value={profil.grad} onChange={ (e) =>  setProfil((profil)=>({...profil,grad:e.target.value})) } disabled={ch}></input>
                </Grid> 
                  <Button startIcon={<EditIcon/>}onClick={()=>{izmeni_grad();}}> Izmeni</Button>
                  </Grid>
                  <Grid container spacing={1} sx={{display:'flex', justifyContent:'space-around',alignItems:'center',margin:'2px'}}>
                <Grid item xs={2}>
                      <label style={{}}>Adresa:</label>
                </Grid>
                <Grid item >
                <input type='text' id='opis' style={{borderRadius:'10px'}} value={profil.adresa} onChange={ (e) =>  setProfil((profil)=>({...profil,adresa:e.target.value})) } disabled={ch}></input>
                </Grid>
                  <Button startIcon={<EditIcon/>}onClick={()=>{izmeni_adresu();}} > Izmeni</Button>
                  </Grid>
         </Grid> <div className='izmeniVlasnika' style={{display:'flex',justifyContent:'center'}} >
             
       <Button variant="outlined" startIcon={<EditIcon />} onClick = {() =>{ handleCh(); }} style={{backgroundColor:'rgb(93, 224, 100)',color:'black',borderRadius:'25px',marginTop:'20px'}}>
        Edituj podatke
      </Button>
        </div>
        </Card>
          </div>
          </div>
        <div className={classes.divButton}>
      </div>
      <Footer/>
    </>
      );
      }
  
export default ProfilVlasnik