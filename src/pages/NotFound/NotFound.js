import { Box } from '@material-ui/core';
import { Typography } from '@mui/material';
import React from 'react';


export default function NotFound() {
    return (
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection:'column'
      }}
    >
      <Typography variant="h1" style={{ color: '#0575B4',fontWeight:'bold' }}>
        404
      </Typography>
     
      <Typography variant="h4" style={{color:'#aaa'}}>
        Restaurant not found!
      </Typography>

      <Typography variant="h5" style={{color:'#aaa'}}>
        Please go to the right URL.
      </Typography>
    </Box>
      );
}
