import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    notes:{
        type:String
    },
    isImportant:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date
    }
},{
    timestamps:true
});

let Notes = mongoose.model('Notes',notesSchema);

export default Notes;