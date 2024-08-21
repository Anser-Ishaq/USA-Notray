import React from 'react';
import Steppers from '../../components/Stepper/Stepper';
import { Typography } from '@mui/material';
import useStore from '../../stores/useStore'; 

const NotarizeDocument = () => {
  const price = useStore((state) => state.price); 

  return (
    <div>
      <div style={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
        <Typography variant="h5" gutterBottom>
          Total Price: <span style={{fontWeight: "bold"}}>{`$ ${price}.00`}</span>
        </Typography>
      </div>
      <div style={{ boxShadow: '3px 3px 20px #E6EFFF', padding: '60px' }}>
        <Steppers />
      </div>
    </div>
  );
};

export default NotarizeDocument;
