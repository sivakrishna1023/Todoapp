import React, { useEffect, useState } from 'react'
import './compnents.css';
import { Typography, FormControl, InputLabel, Container, FilledInput, Box, InputAdornment, IconButton, Link, Grid, Button, Card, TextField, useTheme } from '@mui/material'
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { VisibilityOff, Visibility } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete';
function Input() {
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [tasks, settasks] = useState([]);
  useEffect(() => {
    async function taskfinder() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/user/myalltasks', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data;
        settasks(data);
      } catch (error) {
        console.error(error);
      }
    }
    taskfinder();
  }, [])

  return (<>
    <div style={{ display: 'flex', padding: 10, margin: 3, flexWrap: 'wrap', justifyContent: 'center' }} >
      <div id='myDiv'>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 15 }}  >
          <Typography variant='h6'>Enter Your New Task</Typography>
        </div>
        <Container component="main" maxWidth="xs" sx={{ padding: 3, paddingBottom: 2, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' } }} >
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2} >
              <Grid item xs={12}  >
                <TextField autoFocus onChange={(e) => { settitle(e.target.value) }} fullWidth={true} id="outlined" label="Task Name" variant="outlined" /> <br /> <br />
              </Grid>
              <Grid item xs={12} >
                <TextField onChange={(e) => { setdescription(e.target.value) }} multiline rows={3} fullWidth={true} id="outlined" label="Task Description" variant="outlined" /> <br /> <br />
              </Grid>
            </Grid>
            <center>
              <Button onClick={async () => {
                try {
                  const token = localStorage.getItem('token');
                  const response = await axios.post('http://localhost:3000/user/addtask', {
                    title: title,
                    description: description
                  }, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                  })
                  let data = response.data;
                  console.log(data);
                } catch (error) {
                  console.error(error);
                }
                async function taskfinder() {
                  try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get('http://localhost:3000/user/myalltasks', {
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      }
                    });
                    const data = response.data;
                    settasks(data);
                  } catch (error) {
                    console.error(error);
                  }
                }
                taskfinder();
              }} variant="contained" sx={{ mt: 2, mb: 2 }} >Add Task</Button> </center>
          </Box>
        </Container>
      </div>
      <div id='myDiv1'>
        {tasks.mytasks && tasks.mytasks.map((element) => (
           <div key={element._id} >
          <Tasking  title={element.title} description={element.description} id={element._id}></Tasking>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}
function Tasking(props) {

  const theme = useTheme();
  const isxsscreen = useMediaQuery(theme.breakpoints.only('xs'));
  const handleclick= async(elementid)=>{
    const token=localStorage.getItem('token')
    const response= await axios.delete(`http://localhost:3000/user/delete/${elementid}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data=response.data;
    console.log(data);
  }
  // {console.log(props.title)} {console.log(props.description)}
  return (
    <>
      <Card variant="outlined" style={{ padding: 3, paddingTop: 20, paddingBottom: 10, marginBottom: 10 }} >
        <Container component="main" >
          <Box>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={4} >
                <TextField
                  disabled
                  fullWidth
                  id="outlined-disabled"
                  label="Title"
                  defaultValue={props.title}
                />
              </Grid>
              <Grid item xs={12} sm={7} >
                <TextField
                  disabled
                  fullWidth
                  id="outlined-disabled"
                  label="Description"
                  defaultValue={props.description}
                />
              </Grid>
              <Grid item xs={12} sm={1} container justifyContent="center" >
                {isxsscreen ? (
                  <Button onClick={()=>{handleclick(props.id)}} variant="outlined" startIcon={<DeleteIcon />} style={{ textTransform: 'none' }}>
                    Delete
                  </Button>
                ) : (
                  <IconButton onClick={()=>{handleclick(props.id)}}  aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Card>
    </>
  )
}
export default Input;