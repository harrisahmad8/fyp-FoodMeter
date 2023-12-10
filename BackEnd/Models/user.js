
const mongoose= require('mongoose')
const {Schema}=mongoose;
const userSchema=new Schema({ 
    name:{type:String,required:true},
    email:{type:String,required:true}, 
    password:{type:String,required:true},
    role:{type:String,required:true}, 
    number:{type:Number,required:true},
    photo:{type:String},
},
{timestamps:true}
 );
 module.exports=mongoose.model('User',userSchema,'users');
