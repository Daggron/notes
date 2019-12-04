import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    notes:{
        type:Object,
        required:true
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