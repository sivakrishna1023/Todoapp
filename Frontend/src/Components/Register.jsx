import React, { useEffect, useState } from 'react'
import './compnents.css';
import { Typography, FormControl, InputLabel, Container, FilledInput, Input, Box, InputAdornment, IconButton, Link, Grid, Button, Card, TextField, useTheme } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import axios from 'axios';
export default function Register() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [mail, setmail] = useState('');
  const [password, setpassword] = useState('');
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '13vh', marginBottom: 30 }}  >
        <Typography variant='h6'>Welcome Register Yourself...!!</Typography>
      </div>

      <Container component="main" maxWidth="xs" sx={{ border: `1px solid ${theme.palette.divider}`, padding: 3, paddingBottom: 2, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' } }} >
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={6} >
              <TextField autoFocus fullWidth label="First Name" variant="filled" ></TextField>
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField fullWidth label="Last Name" variant="filled" ></TextField>
            </Grid>

            <Grid item xs={12}  >
              <TextField
                onChange={(e)=>{setmail(e.target.value)}}
                
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
            <Button variant="contained" onClick={ async ()=>{
                 try{
                  const response= await axios.post('http://localhost:3000/user/register',{
                    mail:mail,
                    password:password
                   })
                   const data=response.data;
                   localStorage.setItem('token',data.token);
                   window.location='/';
                 }catch(error){
                  console.error(error);
                 }
            }} sx={{ mt: 3, mb: 2 }} >Register</Button> </center>
          <Grid container justifyContent={'flex-end'}  sx={{ mb: 1 }}>
            <Grid>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
