const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
app.use(cors());
app.use(express.json());
const users=require('./Routes/users');
app.use('/user',users);

//conneting to database.....
mongoose.connect('mongodb+srv://sivakrishna:qb4GwFPjiNNJTZ04@cluster0.7fc7lzg.mongodb.net/Taskusers',{ useNewUrlParser: true, useUnifiedTopology: true, dbName: "Taskusers" });

app.listen(3000,()=>{
    console.log("I am Listening..!!");
})