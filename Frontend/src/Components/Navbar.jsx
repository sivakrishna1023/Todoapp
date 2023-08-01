import React, { useEffect, useState } from 'react'
import { Typography, FormControl, InputLabel, Container, FilledInput, Input, Box, InputAdornment, IconButton, Link, Grid, Button, Card, TextField, useTheme } from '@mui/material'
import axios from 'axios';
function Navbar() {
  const [mail, setmail] = useState(null);
  useEffect(() => {
    async function checklogin() {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:3000/user/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = response.data;
      setmail(data.mail);
    }
    checklogin();
  }, [])
  if (mail) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: 3, backgroundColor: 'skyblue', padding: 10, borderRadius: 5 }}>
          <div style={{ marginTop: 10, marginLeft: 8 }} >
            <Typography variant='h5' > TaskManager </Typography>
          </div>
          <div style={{ display: 'flex', margin: 10 }} >
            <div style={{ marginRight: 10 }} >
              <Button href='/login' onClick={() => {
                localStorage.setItem('token', null);
              }} variant="contained">Logout</Button>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: 3, backgroundColor: 'skyblue', padding: 10, borderRadius: 5 }}>
        <div style={{ marginTop: 10, marginLeft: 8 }} >
          <Typography variant='h5' > TaskManager </Typography>
        </div>
        <div style={{ display: 'flex', margin: 10 }} >
          <div style={{ marginRight: 10 }} >
            <Button href='/login' variant="contained">Login</Button>
          </div>
          <div>
            <Button href='/' variant="contained">Register</Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Navbar;