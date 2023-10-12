import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import classStyles from './styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
import Ocene from '../ocene/index.jsx';
import { Label } from '@mui/icons-material';

export default function BasicCard(props) {

  const { vreme, komentar, ocena, vlasnikId,comment } = props;
  {console.log(comment.id)}
  const timeDate=new Date(vreme).toLocaleDateString()
  const timeTime=new Date(vreme).toLocaleTimeString(['hr-HR'],{hour:'2-digit',minute:'2-digit'});
  const [vlasnik, setVlasnici] = useState([]);

    useEffect(() => {
    const TOKEN=localStorage.getItem('token')
    fetch(
      'https://localhost:5001/Vlasnik/vratiVlasnikaPoId?id=' + comment.id,
      {
       headers:{ Authorization: `Bearer ${TOKEN}`}
      }
      ).then(async res => {
        const rez = await res.json();
        setVlasnici(rez);
      });
      }, []);

      const classes = classStyles();
      return (
        <div className={classes.divKartica}>
          <Card style={{ border: '1px solid black', flex: 1 }}>
            <Ocene style={{}} ocena={ocena} />
            <Typography variant="h5" component="div" style={{ marginLeft: '15px' }}>
              {vlasnik.ime} {vlasnik.prezime}
            </Typography>

            <CardContent>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              ></Typography>

              <Typography variant="body1">{komentar}</Typography>
              <div className={classes.divVreme}>{'Dana: ' + timeDate + ' u ' + timeTime}</div>
            </CardContent>
          </Card>
        </div>
      );
    }
