import React, { useEffect, useState } from 'react'
import './compnents.css';
import { Typography, FormControl, InputLabel, Container, FilledInput, Input, Box, InputAdornment, IconButton, Link, Grid, Button, Card, TextField, useTheme } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import axios from 'axios';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [mail,setmail]=useState('');
  const [password,setpassword]=useState('');
  const theme = useTheme();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh', marginBottom: 30 }}  >
        <Typography variant='h6'>Enter You details to Login</Typography>
      </div>
      <Container component="main" maxWidth="xs" sx={{ border: `1px solid ${theme.palette.divider}`, padding: 3, paddingBottom: 2, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' } }} >
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2} >
            <Grid item xs={12}  >
              <TextField
                onChange={(e)=>{setmail(e.target.value)}}
                autoFocus
                fullWidth={true}
                id="filled-basic"
                label="Email"
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MailTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
              onChange={(e)=>{setpassword(e.target.value)}}
                fullWidth
                id="filled-password"
                label="Password"
                variant="filled"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge='end' >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <center>
            <Button onClick={ async()=>{
            try {
              const response =await axios.post('http://localhost:3000/user/login',{
                mail:mail,
                password:password
              })
              let data=response.data;
              localStorage.setItem('token',data.token);
              window.location="/Tasks"
            }
            catch(error){
                 console.error(error);
            }
            }} variant="contained" sx={{ mt: 3, mb: 2 }} >Login</Button> </center>
          <Grid container justifyContent={'flex-end'} sx={{ mb: 1 }} >
            <Grid>
              <Link href="/" variant="body2">
                New Here ? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
