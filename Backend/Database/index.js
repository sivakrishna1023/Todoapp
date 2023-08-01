const mongoose=require('mongoose');
//defining the schema
const userSchema = new mongoose.Schema({
    mail: String,
    password: {type: String},
    mytasks:[{type:mongoose.Schema.Types.ObjectId, ref: 'Tasks'}]
})
const tasksSchema = new mongoose.Schema({
    title:String,
    description:String 
})
//defining the model
const User=mongoose.model('User',userSchema);
const Tasks=mongoose.model('Tasks',tasksSchema);

module.exports={
     User,
     Tasks
}