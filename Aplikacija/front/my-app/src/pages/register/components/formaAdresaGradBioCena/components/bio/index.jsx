import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import { ValidationTextField } from './styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const Bio = props => {
  const [validBio, setValidBio] = useState(false);
  const { bio, setBio } = props;
  const classes = classStyles();

  useEffect(() => {
    const result = bio;
    setValidBio(result);
  }, [bio]);

  return (
    <form noValidate className={classes.container}>
      <TextareaAutosize
        placeholder="Opis"
        style={{ width: 300, height: 50 }}
        onChange={e => setBio(e.target.value)}
        aria-invalid={validBio ? 'false' : 'true'}
        value={bio}
      />
    </form>
  );
};

export default Bio;
