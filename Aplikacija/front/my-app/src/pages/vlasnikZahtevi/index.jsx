
import { styles } from './styles';
import React, { useState,useEffect } from 'react';
import classStyles from './styles';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NavBar from '../headerVlasnik';
import DeleteIcon from '@mui/icons-material/Delete';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Axios from 'axios';
import axios from '../../api/axios';
import { ButtonGroup, Typography } from '@mui/material';
import Footer from '../../components/Footer'
const VlasnikZahtevi =()=>
{

const idVlasnika=localStorage.getItem('idVlasnika')
const [prihvaceni,setPrihvaceni]=useState([])
const prihvaceni_zahtevi=()=>
{
    const TOKEN=localStorage.getItem('token')
        Axios.get('https://localhost:5001/Usluga/vratiUslugeVlasnikuPoStatusu?idVlasnika=' + idVlasnika + '&status=1',
        {
            headers:{ Authorization: `Bearer ${TOKEN}`}
          }).then(
            res=>

            {
                console.log(res)
                setPrihvaceni(res.data)
            }
        )
}
const [pas,setPas]=useState('')
const vrati_psa=(props)=>
{
    Axios.get('https://localhost:5001/Pas/vratiPsaPoId?idPas='+ props).then(
        res=>
        {
            console.log(res.data)
            setPas(res.data.ime)
        }
    )
}

let pasId=[]
return(
    <div className='prihvaceni_zahtevi'>
        <Button color='success' onClick={prihvaceni_zahtevi}>Klikni da vidis sve prihvacene zahteve</Button>
        {prihvaceni && prihvaceni.map(x=>
        (   <div>
        {pasId=x.pasId}
        <h3 onClick={()=>vrati_psa(pasId)}>Sitter:{x.siter.ime} {x.siter.prezime} je prihvatio vas zahtev za kera {pas} </h3>
        </div>
     ))}
    </div>)}
export default VlasnikZahtevi