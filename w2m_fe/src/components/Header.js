import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Header = () => {
    return (
      <Box sx={{ flexGrow: 1, textAlign: 'center'  }}>
        <AppBar position="static">
            <Typography variant="h6" component="a" href="/" sx={{ flexGrow: 1, mr: 2, fontWeight: 700, color: 'inherit', textDecoration: 'none', }}>
              Where 2 Eat
            </Typography>
        </AppBar>
      </Box>
    );
  };

export default Header;