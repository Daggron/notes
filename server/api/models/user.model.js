import Mongoose, { mongo } from 'mongoose';

const userSchema = new Mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    token:{
        type:String,
    }
},{
    timestamps:true
});

const User = Mongoose.model('User',userSchema);

export default User;